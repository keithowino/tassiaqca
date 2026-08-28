import {
	AUDIT_ACTIONS,
	AUDIT_ENTITY_TYPES,
	HTTP_STATUS,
	AppError,
	ErrorCodes,
} from "../../../shared/index.js";

import {
	branchAssignmentRepository,
	branchRepository,
	businessRepository,
} from "../repositories/index.js";

import { businessMemberRepository } from "../../identity/index.js";

import { auditLogService } from "../../audit/index.js";

import { branchAssignmentPresenter } from "../presenters/index.js";

class BranchAssignmentService {
	async assign({
		businessId,
		branchId,
		businessMemberId,
		actorId,
		requestMetadata,
	}) {
		const business = await businessRepository.findById(businessId);

		if (!business) {
			throw new AppError(
				"Business not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		const branch = await branchRepository.findByBusinessAndId(
			businessId,
			branchId,
		);

		if (!branch) {
			throw new AppError(
				"Branch not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		if (!branch.active) {
			throw new AppError(
				"Cannot assign members to an inactive branch.",
				HTTP_STATUS.CONFLICT,
				ErrorCodes.CONFLICT,
			);
		}

		const member =
			await businessMemberRepository.findById(businessMemberId);

		if (!member || String(member.business) !== String(businessId)) {
			throw new AppError(
				"Business member not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		if (!member.active) {
			throw new AppError(
				"Cannot assign an inactive member.",
				HTTP_STATUS.CONFLICT,
				ErrorCodes.CONFLICT,
			);
		}

		const existingAssignment =
			await branchAssignmentRepository.findActiveByMemberAndBranch(
				member.id,
				branch.id,
			);

		if (existingAssignment) {
			throw new AppError(
				"This member is already assigned to this branch.",
				HTTP_STATUS.CONFLICT,
				ErrorCodes.CONFLICT,
			);
		}

		const activeAssignments =
			await branchAssignmentRepository.countActiveByMember(member.id);

		const assignment = await branchAssignmentRepository.create({
			businessMember: member.id,
			branch: branch.id,
			assignedBy: actorId,
			primary: activeAssignments === 0,
		});

		await auditLogService.log({
			business: businessId,
			entityType: AUDIT_ENTITY_TYPES.BRANCH_ASSIGNMENT,
			entityId: assignment.id,
			action: AUDIT_ACTIONS.BRANCH_MEMBER_ASSIGNED,
			actor: actorId,

			requestMetadata,

			metadata: {
				member: {
					id: member.id,
				},
				branch: {
					id: branch.id,
					name: branch.name,
				},
				primary: assignment.primary,
			},
		});

		return branchAssignmentPresenter.present(assignment);
	}

	async setPrimary({
		businessId,
		branchId,
		memberId,
		actorId,
		requestMetadata,
	}) {
		const business = await businessRepository.findById(businessId);

		if (!business) {
			throw new AppError(
				"Business not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		const branch = await branchRepository.findByBusinessAndId(
			businessId,
			branchId,
		);

		if (!branch) {
			throw new AppError(
				"Branch not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		if (!branch.active) {
			throw new AppError(
				"Cannot make an inactive branch primary.",
				HTTP_STATUS.CONFLICT,
				ErrorCodes.CONFLICT,
			);
		}

		const member = await businessMemberRepository.findById(memberId);

		if (!member || String(member.business) !== String(businessId)) {
			throw new AppError(
				"Business member not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		const assignment =
			await branchAssignmentRepository.findActiveByMemberAndBranch(
				member.id,
				branch.id,
			);

		if (!assignment) {
			throw new AppError(
				"Active branch assignment not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		if (assignment.primary) {
			return assignment;
		}

		await branchAssignmentRepository.clearPrimary(member.id);

		assignment.primary = true;

		const newBranch = await branchAssignmentRepository.save(assignment);

		await auditLogService.log({
			business: businessId,
			entityType: AUDIT_ENTITY_TYPES.BRANCH_ASSIGNMENT,
			entityId: assignment.id,
			action: AUDIT_ACTIONS.PRIMARY_BRANCH_CHANGED,
			actor: actorId,

			requestMetadata,

			metadata: {
				member: {
					id: member.id,
				},
				// newPrimaryBranch: {
				// 	id: branch.id,
				// 	name: branch.name,
				// },
				newPrimaryBranch: {
					id: newBranch.id,
					name: newBranch.name,
				},
			},
		});

		return branchAssignmentPresenter.present(newBranch);
	}

	async listBranchMembers({ businessId, branchId }) {
		const business = await businessRepository.findById(businessId);

		if (!business) {
			throw new AppError(
				"Business not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		const branch = await branchRepository.findByBusinessAndId(
			businessId,
			branchId,
		);

		if (!branch) {
			throw new AppError(
				"Branch not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		const assignments = branchAssignmentRepository.findByBranch(branchId);

		return branchAssignmentPresenter.presentCollection(assignments);
	}

	async listMemberBranches({ businessId, businessMemberId }) {
		const business = await businessRepository.findById(businessId);

		if (!business) {
			throw new AppError(
				"Business not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		const member =
			await businessMemberRepository.findById(businessMemberId);

		if (!member || String(member.business) !== String(businessId)) {
			throw new AppError(
				"Business member not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		const assignments = branchAssignmentRepository.findByMember(member.id);

		return branchAssignmentPresenter.presentCollection(assignments);
	}

	async deactivate({
		businessId,
		branchId,
		memberId,
		actorId,
		requestMetadata,
	}) {
		const business = await businessRepository.findById(businessId);

		if (!business) {
			throw new AppError(
				"Business not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		const branch = await branchRepository.findByBusinessAndId(
			businessId,
			branchId,
		);

		if (!branch) {
			throw new AppError(
				"Branch not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		const member = await businessMemberRepository.findById(memberId);

		if (!member || String(member.business) !== String(businessId)) {
			throw new AppError(
				"Business member not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		const assignment =
			await branchAssignmentRepository.findActiveByMemberAndBranch(
				member.id,
				branch.id,
			);

		if (!assignment) {
			throw new AppError(
				"Active branch assignment not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		const wasPrimary = assignment.primary;

		assignment.active = false;
		assignment.primary = false;

		await branchAssignmentRepository.save(assignment);

		if (wasPrimary) {
			const replacement =
				await branchAssignmentRepository.findFirstActiveByMember(
					assignment.businessMember,
				);

			if (replacement) {
				replacement.primary = true;

				await branchAssignmentRepository.save(replacement);
			}
		}

		await auditLogService.log({
			business: businessId,
			entityType: AUDIT_ENTITY_TYPES.BRANCH_ASSIGNMENT,
			entityId: assignment.id,
			action: AUDIT_ACTIONS.BRANCH_MEMBER_UNASSIGNED,
			actor: actorId,

			requestMetadata,

			metadata: {
				branch: {
					id: branch.id,
					name: branch.name,
				},
			},
		});

		return branchAssignmentPresenter.present(assignment);
	}

	async reactivate({
		businessId,
		branchId,
		memberId,
		actorId,
		requestMetadata,
	}) {
		const business = await businessRepository.findById(businessId);

		if (!business) {
			throw new AppError(
				"Business not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		const branch = await branchRepository.findByBusinessAndId(
			businessId,
			branchId,
		);

		if (!branch) {
			throw new AppError(
				"Branch not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		if (!branch.active) {
			throw new AppError(
				"Cannot reactivate an assignment for an inactive branch.",
				HTTP_STATUS.CONFLICT,
				ErrorCodes.CONFLICT,
			);
		}

		const member = await businessMemberRepository.findById(memberId);

		if (!member || String(member.business) !== String(businessId)) {
			throw new AppError(
				"Business member not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		const assignment =
			await branchAssignmentRepository.findInactiveByMemberAndBranch(
				member.id,
				branch.id,
			);

		if (!assignment) {
			throw new AppError(
				"Inactive branch assignment not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		assignment.active = true;

		await auditLogService.log({
			business: businessId,
			entityType: AUDIT_ENTITY_TYPES.BRANCH_ASSIGNMENT,
			entityId: assignment.id,
			action: AUDIT_ACTIONS.BRANCH_MEMBER_REACTIVATED,
			actor: actorId,

			requestMetadata,

			metadata: {
				branch: {
					id: branch.id,
					name: branch.name,
				},
			},
		});

		branchAssignmentRepository.save(assignment);

		return branchAssignmentPresenter.present(assignment);
	}
}

export default new BranchAssignmentService();
