import {
	AUDIT_ACTIONS,
	AUDIT_ENTITY_TYPES,
	ensureOfferingSupportsComponent,
	OFFERING_COMPONENTS,
	ensureBusinessExists,
	ensureOfferingExists,
} from "../../../../../shared/index.js";

import { auditLogService } from "../../../../audit/index.js";

import { schedulingFactory } from "../builders/index.js";
import { schedulingPresenter } from "../presenters/index.js";
import { schedulingRepository } from "../repositories/index.js";

class SchedulingService {
	ensureSchedulingSupported(offering) {
		ensureOfferingSupportsComponent(
			offering,
			OFFERING_COMPONENTS.SCHEDULING,
			"Scheduling is not supported for this offering.",
		);
	}

	buildAuditMetadata(scheduling) {
		return {
			offeringId: scheduling.offering,
			schedulingId: scheduling.id,
			mode: scheduling.mode,
			timezone: scheduling.timezone,
			active: scheduling.active,
		};
	}

	async setScheduling({
		businessId,
		offeringId,
		data,
		actor,
		requestMetadata,
	}) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureSchedulingSupported(offering);

		let scheduling = await schedulingRepository.findByBusinessAndOffering(
			businessId,
			offeringId,
		);

		if (!scheduling) {
			const assignment = schedulingFactory.createSchedulingAssignment({
				businessId,
				offeringId,
				data,
				actor,
			});

			scheduling = await schedulingRepository.create(assignment);

			await auditLogService.log({
				business: businessId,
				entityType: AUDIT_ENTITY_TYPES.OFFERING_SCHEDULING,
				entityId: scheduling.id,
				action: AUDIT_ACTIONS.OFFERING_SCHEDULING_CREATED,
				actor,
				requestMetadata,
				metadata: this.buildAuditMetadata(scheduling),
			});
		} else {
			scheduling.mode = data.mode;
			scheduling.timezone = data.timezone;
			scheduling.active = data.active ?? scheduling.active;
			scheduling.updatedBy = actor.id;

			await schedulingRepository.save(scheduling);

			await auditLogService.log({
				business: businessId,
				entityType: AUDIT_ENTITY_TYPES.OFFERING_SCHEDULING,
				entityId: scheduling.id,
				action: AUDIT_ACTIONS.OFFERING_SCHEDULING_UPDATED,
				actor,
				requestMetadata,
				metadata: this.buildAuditMetadata(scheduling),
			});
		}

		return schedulingPresenter.present(scheduling);
	}

	async getScheduling(businessId, offeringId) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureSchedulingSupported(offering);

		const scheduling = await schedulingRepository.findByBusinessAndOffering(
			businessId,
			offeringId,
		);

		return schedulingPresenter.present(scheduling);
	}
}

export const schedulingService = new SchedulingService();

export default schedulingService;
