import {
	AUDIT_ACTIONS,
	AUDIT_ENTITY_TYPES,
	ensureOfferingSupportsComponent,
	OFFERING_COMPONENTS,
	ensureBusinessExists,
	ensureOfferingExists,
} from "../../../../../shared/index.js";

import { auditLogService } from "../../../../audit/index.js";

import { enrollmentFactory } from "../builders/index.js";
import { enrollmentPresenter } from "../presenters/index.js";
import { enrollmentRepository } from "../repositories/index.js";

class EnrollmentService {
	ensureEnrollmentSupported(offering) {
		ensureOfferingSupportsComponent(
			offering,
			OFFERING_COMPONENTS.ENROLLMENT,
			"Enrollment is not supported for this offering.",
		);
	}

	ensureRegistrationSupported(offering) {
		ensureOfferingSupportsComponent(
			offering,
			OFFERING_COMPONENTS.REGISTRATION,
			"Enrollment requires Registration support.",
		);
	}

	buildAuditMetadata(enrollment) {
		return {
			offeringId: enrollment.offering,
			enrollmentId: enrollment.id,
			active: enrollment.active,
			approvalRequired: enrollment.approvalRequired,
			maximumEnrollments: enrollment.maximumEnrollments,
			enrollmentDeadlineMinutes: enrollment.enrollmentDeadlineMinutes,
		};
	}

	async setEnrollment({
		businessId,
		offeringId,
		data,
		actor,
		requestMetadata,
	}) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureEnrollmentSupported(offering);
		this.ensureRegistrationSupported(offering);

		let enrollment = await enrollmentRepository.findByBusinessAndOffering(
			businessId,
			offeringId,
		);

		if (!enrollment) {
			const assignment = enrollmentFactory.createEnrollmentAssignment({
				businessId,
				offeringId,
				data,
				actor,
			});

			enrollment = await enrollmentRepository.create(assignment);

			await auditLogService.log({
				business: businessId,
				entityType: AUDIT_ENTITY_TYPES.OFFERING_ENROLLMENT,
				entityId: enrollment.id,
				action: AUDIT_ACTIONS.OFFERING_ENROLLMENT_CREATED,
				actor,
				requestMetadata,
				metadata: this.buildAuditMetadata(enrollment),
			});
		} else {
			if (data.active !== undefined) {
				enrollment.active = data.active;
			}

			if (data.approvalRequired !== undefined) {
				enrollment.approvalRequired = data.approvalRequired;
			}

			if (data.maximumEnrollments !== undefined) {
				enrollment.maximumEnrollments = data.maximumEnrollments;
			}

			if (data.enrollmentDeadlineMinutes !== undefined) {
				enrollment.enrollmentDeadlineMinutes =
					data.enrollmentDeadlineMinutes;
			}

			enrollment.updatedBy = actor.id;

			await enrollmentRepository.save(enrollment);

			await auditLogService.log({
				business: businessId,
				entityType: AUDIT_ENTITY_TYPES.OFFERING_ENROLLMENT,
				entityId: enrollment.id,
				action: AUDIT_ACTIONS.OFFERING_ENROLLMENT_UPDATED,
				actor,
				requestMetadata,
				metadata: this.buildAuditMetadata(enrollment),
			});
		}

		return enrollmentPresenter.present(enrollment);
	}

	async getEnrollment(businessId, offeringId) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureEnrollmentSupported(offering);
		this.ensureRegistrationSupported(offering);

		const enrollment = await enrollmentRepository.findByBusinessAndOffering(
			businessId,
			offeringId,
		);

		return enrollmentPresenter.present(enrollment);
	}
}

export const enrollmentService = new EnrollmentService();

export default enrollmentService;
