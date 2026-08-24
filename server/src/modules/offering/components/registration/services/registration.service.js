import {
	ensureBusinessExists,
	ensureOfferingExists,
} from "../../shared/index.js";

import {
	AUDIT_ACTIONS,
	AUDIT_ENTITY_TYPES,
	ensureOfferingSupportsComponent,
	OFFERING_COMPONENTS,
} from "../../../../../shared/index.js";

import { auditLogService } from "../../../../audit/index.js";

import { registrationFactory } from "../builders/index.js";
import { registrationPresenter } from "../presenters/index.js";
import { registrationRepository } from "../repositories/index.js";

class RegistrationService {
	ensureRegistrationSupported(offering) {
		ensureOfferingSupportsComponent(
			offering,
			OFFERING_COMPONENTS.REGISTRATION,
			"Registration is not supported for this offering.",
		);
	}

	buildAuditMetadata(registration) {
		return {
			offeringId: registration.offering,
			registrationId: registration.id,
			active: registration.active,
			approvalRequired: registration.approvalRequired,
			maximumRegistrations: registration.maximumRegistrations,
			registrationDeadlineMinutes:
				registration.registrationDeadlineMinutes,
		};
	}

	async setRegistration({
		businessId,
		offeringId,
		data,
		actor,
		requestMetadata,
	}) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureRegistrationSupported(offering);

		let registration =
			await registrationRepository.findByBusinessAndOffering(
				businessId,
				offeringId,
			);

		if (!registration) {
			const assignment = registrationFactory.createRegistrationAssignment(
				{
					businessId,
					offeringId,
					data,
					actor,
				},
			);

			registration = await registrationRepository.create(assignment);

			await auditLogService.log({
				business: businessId,
				entityType: AUDIT_ENTITY_TYPES.OFFERING_REGISTRATION,
				entityId: registration.id,
				action: AUDIT_ACTIONS.OFFERING_REGISTRATION_CREATED,
				actor,
				requestMetadata,
				metadata: this.buildAuditMetadata(registration),
			});
		} else {
			if (data.active !== undefined) {
				registration.active = data.active;
			}

			if (data.approvalRequired !== undefined) {
				registration.approvalRequired = data.approvalRequired;
			}

			if (data.maximumRegistrations !== undefined) {
				registration.maximumRegistrations = data.maximumRegistrations;
			}

			if (data.registrationDeadlineMinutes !== undefined) {
				registration.registrationDeadlineMinutes =
					data.registrationDeadlineMinutes;
			}

			registration.updatedBy = actor.id;

			await registrationRepository.save(registration);

			await auditLogService.log({
				business: businessId,
				entityType: AUDIT_ENTITY_TYPES.OFFERING_REGISTRATION,
				entityId: registration.id,
				action: AUDIT_ACTIONS.OFFERING_REGISTRATION_UPDATED,
				actor,
				requestMetadata,
				metadata: this.buildAuditMetadata(registration),
			});
		}

		return registrationPresenter.present(registration);
	}

	async getRegistration(businessId, offeringId) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureRegistrationSupported(offering);

		const registration =
			await registrationRepository.findByBusinessAndOffering(
				businessId,
				offeringId,
			);

		return registrationPresenter.present(registration);
	}
}

export const registrationService = new RegistrationService();

export default registrationService;
