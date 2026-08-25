import mongoose from "mongoose";

import {
	ensureBusinessExists,
	ensureOfferingExists,
} from "../../shared/index.js";

import {
	AppError,
	AUDIT_ACTIONS,
	AUDIT_ENTITY_TYPES,
	ensureOfferingSupportsComponent,
	ErrorCodes,
	HTTP_STATUS,
	OFFERING_COMPONENTS,
} from "../../../../../shared/index.js";

import { auditLogService } from "../../../../audit/index.js";

import { businessMemberRepository } from "../../../../identity/index.js";

import { instructorFactory } from "../builders/index.js";

import { instructorPresenter } from "../presenters/index.js";

import { instructorRepository } from "../repositories/index.js";

class InstructorService {
	ensureInstructorComponentSupported(offering) {
		return ensureOfferingSupportsComponent(
			offering,
			OFFERING_COMPONENTS.INSTRUCTOR,
			"Instructor is not supported for this offering.",
		);
	}

	buildAuditMetadata(data) {
		return {
			offeringId: data.offering,
			businessMemberId: data.businessMember,
			active: data.active,
		};
	}

	async ensureValidInstructorMembers(businessId, instructorIds = []) {
		const members = [];

		for (const businessMemberId of instructorIds) {
			const member =
				await businessMemberRepository.findById(businessMemberId);

			if (!member || String(member.business) !== String(businessId)) {
				throw new AppError(
					"Business member does not belong to this business.",
					HTTP_STATUS.BAD_REQUEST,
					ErrorCodes.BAD_REQUEST,
				);
			}

			if (!member.active) {
				throw new AppError(
					"Inactive business members cannot be assigned as instructors.",
					HTTP_STATUS.CONFLICT,
					ErrorCodes.CONFLICT,
				);
			}

			members.push(member);
		}

		return members;
	}

	async setInstructors({
		businessId,
		offeringId,
		// instructors = [],
		data,
		actor,
		requestMetadata,
	}) {
		const { instructors } = data;

		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureInstructorComponentSupported(offering);

		await this.ensureValidInstructorMembers(businessId, instructors);

		const session = await mongoose.startSession();

		try {
			session.startTransaction();

			await instructorRepository.deleteByOffering(offeringId, session);

			const assignments = instructors.map((businessMemberId) =>
				instructorFactory.createInstructorAssignment({
					businessId,
					offeringId,
					businessMemberId,
					actor,
				}),
			);

			const created = await instructorRepository.createMany(
				assignments,
				session,
			);

			for (const instructor of created) {
				await auditLogService.log({
					business: businessId,
					entityType: AUDIT_ENTITY_TYPES.OFFERING_INSTRUCTOR,
					entityId: instructor.id,
					action: AUDIT_ACTIONS.OFFERING_INSTRUCTOR_ASSIGNED,
					actor,
					requestMetadata,
					metadata: this.buildAuditMetadata(instructor),
				});
			}

			await session.commitTransaction();

			return instructorPresenter.presentCollection(created);
		} catch (error) {
			await session.abortTransaction();
			throw error;
		} finally {
			await session.endSession();
		}
	}

	async getInstructors(businessId, offeringId) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureInstructorComponentSupported(offering);

		const instructors =
			await instructorRepository.findByOffering(offeringId);

		return instructorPresenter.presentCollection(instructors);
	}
}

export const instructorService = new InstructorService();

export default instructorService;
