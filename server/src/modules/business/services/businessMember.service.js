import {
	AppError,
	ErrorCodes,
	HTTP_STATUS,
	AUDIT_ACTIONS,
	AUDIT_ENTITY_TYPES,
} from "../../../shared/index.js";

import userRepository from "../../identity/repositories/user.repository.js";
import roleRepository from "../../identity/repositories/role.repository.js";
import businessRepository from "../repositories/business.repository.js";
import businessMemberRepository from "../../identity/repositories/businessMember.repository.js";
import mongoose from "mongoose";
import { auditLogService } from "../../audit/index.js";

class BusinessMemberService {
	async invite(businessId, command, { actorId, requestMetadata }) {
		const business = await businessRepository.findById(businessId);

		if (!business) {
			throw new AppError(
				"Business not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		const user = await userRepository.findByEmail(command.email);

		if (!user) {
			throw new AppError(
				"User not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		const alreadyMember =
			await businessMemberRepository.findByUserAndBusiness(
				user._id,
				businessId,
			);

		if (alreadyMember) {
			throw new AppError(
				"User is already a member of this business.",
				HTTP_STATUS.CONFLICT,
				ErrorCodes.CONFLICT,
			);
		}

		const role = await roleRepository.findById(command.roleId);

		if (!role) {
			throw new AppError(
				"Role not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		const member = await businessMemberRepository.create({
			business: businessId,
			user: user._id,
			role: role._id,
		});

		await auditLogService.log({
			business: business.id,
			entityType: AUDIT_ENTITY_TYPES.BUSINESS_MEMBER,
			entityId: member.id,
			action: AUDIT_ACTIONS.MEMBER_INVITED,
			actor: actorId,

			requestMetadata,

			metadata: {
				member: {
					id: member.id,
					email: user.email,
				},
				role: {
					id: role.id,
					name: role.name,
				},
			},
		});

		return businessMemberRepository.findById(member._id);
	}

	async ensureOwnerCanLoseOwnership(member) {
		const ownerRole = await roleRepository.findBySlug("owner");

		if (!ownerRole) {
			return;
		}

		if (member.role.toString() !== ownerRole._id.toString()) {
			return;
		}

		const ownerCount =
			await businessMemberRepository.countByBusinessAndRole(
				member.business,
				ownerRole._id,
			);

		if (ownerCount <= 1) {
			throw new AppError(
				"The last owner of a business cannot lose ownership.",
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.BAD_REQUEST,
			);
		}
	}

	async changeRole(
		{ businessId, memberId, roleId },
		{ actorId, requestMetadata },
	) {
		const member = await businessMemberRepository.findById(memberId);

		if (!member || member.business.toString() !== businessId) {
			throw new AppError(
				"Member not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		const previousRole = member.role.slug;

		const role = await roleRepository.findById(roleId);

		if (!role) {
			throw new AppError(
				"Role not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		if (member.role._id.toString() === role._id.toString()) {
			throw new AppError(
				"Member already has this role.",
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.BAD_REQUEST,
			);
		}

		await this.ensureOwnerCanLoseOwnership(member);

		member.role = role._id;

		await businessMemberRepository.save(member);

		const updatedMember = await businessMemberRepository.findById(
			member._id,
		);

		await auditLogService.log({
			business: businessId,
			entityType: AUDIT_ENTITY_TYPES.BUSINESS_MEMBER,
			entityId: member.id,
			action: AUDIT_ACTIONS.MEMBER_ROLE_CHANGED,
			actor: actorId,

			requestMetadata,

			metadata: {
				from: previousRole,
				to: updatedMember.role.slug,
			},
		});

		return updatedMember;
	}

	async transferOwnership(
		{ businessId, targetMemberId },
		{ actorId, requestMetadata },
	) {
		const currentMember =
			await businessMemberRepository.findByUserAndBusiness(
				actorId,
				businessId,
			);

		if (!currentMember) {
			throw new AppError(
				"You are not a member of this business.",
				HTTP_STATUS.FORBIDDEN,
				ErrorCodes.FORBIDDEN,
			);
		}

		const ownerRole = await roleRepository.findOwnerRole();

		if (!ownerRole) {
			throw new AppError(
				"Owner role not found.",
				HTTP_STATUS.INTERNAL_SERVER_ERROR,
				ErrorCodes.INTERNAL_SERVER_ERROR,
			);
		}

		if (currentMember.role.toString() !== ownerRole._id.toString()) {
			throw new AppError(
				"Only an owner can transfer ownership.",
				HTTP_STATUS.FORBIDDEN,
				ErrorCodes.FORBIDDEN,
			);
		}

		const targetMember =
			await businessMemberRepository.findById(targetMemberId);

		if (!targetMember || targetMember.business.toString() !== businessId) {
			throw new AppError(
				"Member not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		if (targetMember.user.toString() === actorId.toString()) {
			throw new AppError(
				"You already own this business.",
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.BAD_REQUEST,
			);
		}

		if (targetMember.role.toString() === ownerRole._id.toString()) {
			throw new AppError(
				"Selected member is already an owner.",
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.BAD_REQUEST,
			);
		}

		const administratorRole = await roleRepository.findAdministratorRole();

		if (!administratorRole) {
			throw new AppError(
				"Administrator role not found.",
				HTTP_STATUS.INTERNAL_SERVER_ERROR,
				ErrorCodes.INTERNAL_SERVER_ERROR,
			);
		}

		const session = await mongoose.startSession();

		try {
			await session.withTransaction(async () => {
				targetMember.role = ownerRole._id;
				currentMember.role = administratorRole._id;

				await businessMemberRepository.save(targetMember, session);

				await businessMemberRepository.save(currentMember, session);
			});

			const updatedTargetMember = await businessMemberRepository.findById(
				targetMember._id,
			);

			const updatedCurrentMember =
				await businessMemberRepository.findById(currentMember._id);

			await auditLogService.log({
				business: businessId,
				entityType: AUDIT_ENTITY_TYPES.BUSINESS,
				entityId: businessId,
				action: AUDIT_ACTIONS.OWNERSHIP_TRANSFERRED,
				actor: actorId,

				requestMetadata,

				metadata: {
					from: {
						member: updatedCurrentMember._id,
						role: administratorRole.slug,
					},
					to: {
						member: updatedTargetMember._id,
						role: ownerRole.slug,
					},
				},
			});
		} finally {
			await session.endSession();
		}

		return {
			previousOwner: currentMember._id,
			newOwner: targetMember._id,
		};
	}

	async leaveBusiness({ businessId }, { actorId, requestMetadata }) {
		const member = await businessMemberRepository.findByUserAndBusiness(
			actorId,
			businessId,
		);

		if (!member) {
			throw new AppError(
				"You are not a member of this business.",
				HTTP_STATUS.FORBIDDEN,
				ErrorCodes.FORBIDDEN,
			);
		}

		await this.ensureOwnerCanLoseOwnership(member);

		await auditLogService.log({
			business: businessId,
			entityType: AUDIT_ENTITY_TYPES.BUSINESS_MEMBER,
			entityId: member.id,
			action: AUDIT_ACTIONS.MEMBER_LEFT,
			actor: actorId,

			requestMetadata,
		});

		await businessMemberRepository.remove(member);

		return {
			memberId: member._id,
		};
	}

	async remove({ businessId, memberId }, { actorId, requestMetadata }) {
		const member = await businessMemberRepository.findById(memberId);

		if (!member) {
			throw new AppError(
				"Member not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		if (member.business.toString() !== businessId) {
			throw new AppError(
				"Member not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		if (member.user._id.toString() === actorId.toString()) {
			throw new AppError(
				"You cannot remove yourself.",
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.BAD_REQUEST,
			);
		}

		await this.ensureOwnerCanLoseOwnership(member);

		await auditLogService.log({
			business: businessId,
			entityType: AUDIT_ENTITY_TYPES.BUSINESS_MEMBER,
			entityId: member.id,
			action: AUDIT_ACTIONS.MEMBER_REMOVED,
			actor: actorId,

			requestMetadata,
		});

		await businessMemberRepository.remove(member);

		return {
			memberId: member._id,
		};
	}

	async deactivate({ businessId, memberId }, { actorId, requestMetadata }) {
		const member = await businessMemberRepository.findByBusinessAndId(
			businessId,
			memberId,
		);

		if (!member) {
			throw new AppError(
				"Member not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		if (!member.active) {
			throw new AppError(
				"Member is already inactive.",
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.BAD_REQUEST,
			);
		}

		if (member.user._id.toString() === actorId.toString()) {
			throw new AppError(
				"You cannot deactivate yourself.",
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.BAD_REQUEST,
			);
		}

		await this.ensureOwnerCanLoseOwnership(member);

		member.active = false;

		await businessMemberRepository.save(member);

		const updatedMember = await businessMemberRepository.findById(
			member._id,
		);

		await auditLogService.log({
			business: businessId,
			entityType: AUDIT_ENTITY_TYPES.BUSINESS_MEMBER,
			entityId: member.id,
			action: AUDIT_ACTIONS.MEMBER_DEACTIVATED,
			actor: actorId,

			requestMetadata,
		});

		return updatedMember;
	}

	async reactivate({ businessId, memberId }, { actorId, requestMetadata }) {
		const member = await businessMemberRepository.findByBusinessAndId(
			businessId,
			memberId,
		);

		if (!member) {
			throw new AppError(
				"Member not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		if (member.active) {
			throw new AppError(
				"Member is already active.",
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.BAD_REQUEST,
			);
		}

		member.active = true;

		await businessMemberRepository.save(member);

		const updatedMember = await businessMemberRepository.findById(
			member._id,
		);

		await auditLogService.log({
			business: businessId,
			entityType: AUDIT_ENTITY_TYPES.BUSINESS_MEMBER,
			entityId: member.id,
			action: AUDIT_ACTIONS.MEMBER_REACTIVATED,
			actor: actorId,

			requestMetadata,
		});

		return updatedMember;
	}

	async list(businessId) {
		const business = await businessRepository.findById(businessId);

		if (!business) {
			throw new AppError(
				"Business not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		return businessMemberRepository.findByBusiness(businessId);
	}
}

export default new BusinessMemberService();
