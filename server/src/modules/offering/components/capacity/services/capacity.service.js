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

// import { capacityBuilder, capacityFactory } from "../builders/index.js";
import { capacityFactory } from "../builders/index.js";
import { capacityPresenter } from "../presenters/index.js";
import { capacityRepository } from "../repositories/index.js";

class CapacityService {
	ensureCapacityComponentSupported(offering) {
		return ensureOfferingSupportsComponent(
			offering,
			OFFERING_COMPONENTS.CAPACITY,
			"Capacity is not supported for this offering.",
		);
	}

	buildAuditMetadata(capacity) {
		return {
			offeringId: capacity.offering,
			limit: capacity.limit,
		};
	}

	async setCapacity({
		businessId,
		offeringId,
		limit,
		actor,
		requestMetadata,
	}) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureCapacityComponentSupported(offering);

		let capacity = await capacityRepository.findByOfferingAndBusiness(
			businessId,
			offeringId,
		);

		if (!capacity) {
			// const data = capacityBuilder
			// 	.setBusiness(businessId)
			// 	.setOffering(offeringId)
			// 	.setLimit(limit)
			// 	.setCreatedBy(actor.id)
			// 	.build();

			const data = capacityFactory.createCapacityAssignment({
				businessId,
				offeringId,
				limit,
				actor,
			});

			capacity = await capacityRepository.create(data);

			await auditLogService.log({
				business: businessId,
				entityType: AUDIT_ENTITY_TYPES.OFFERING_CAPACITY,
				entityId: capacity.id,
				action: AUDIT_ACTIONS.OFFERING_CAPACITY_CREATED,
				actor,
				requestMetadata,
				metadata: this.buildAuditMetadata(capacity),
			});
		} else {
			capacity.limit = limit;
			capacity.updatedBy = actor.id;

			await capacityRepository.save(capacity);

			await auditLogService.log({
				business: businessId,
				entityType: AUDIT_ENTITY_TYPES.OFFERING_CAPACITY,
				entityId: capacity.id,
				action: AUDIT_ACTIONS.OFFERING_CAPACITY_UPDATED,
				actor,
				requestMetadata,
				metadata: this.buildAuditMetadata(capacity),
			});
		}

		return capacityPresenter.present(capacity);
	}

	async getCapacity(businessId, offeringId) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureCapacityComponentSupported(offering);

		const capacity = await capacityRepository.findByOfferingAndBusiness(
			businessId,
			offeringId,
		);

		return capacityPresenter.present(capacity);
	}
}

export const capacityService = new CapacityService();

export default capacityService;
