import mongoose from "mongoose";

import { attributesFactory } from "../builders/index.js";
import { attributesPresenter } from "../presenters/index.js";
import { attributesRepository } from "../repositories/index.js";

import { normalizeAttributes } from "../validators/index.js";

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

class AttributesService {
	ensureAttributeComponentSupported(offering) {
		return ensureOfferingSupportsComponent(
			offering,
			OFFERING_COMPONENTS.ATTRIBUTES,
			"Attributes are not supported for this offering.",
		);
	}

	buildAuditMetadata(data) {
		return {
			offeringId: data.offering,
			createdBy: data.createdBy,
			updatedBy: data.updatedBy,
		};
	}

	async setAttributes({
		businessId,
		offeringId,
		attributes = [],
		actor,
		requestMetadata,
	}) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureAttributeComponentSupported(offering);

		const normalizedAttributes = normalizeAttributes(attributes);

		const session = await mongoose.startSession();

		try {
			session.startTransaction();

			await attributesRepository.deleteByOffering(offeringId, session);

			const assignments = normalizedAttributes.map((attribute) =>
				attributesFactory.createAttribute({
					businessId,
					offeringId,
					attribute,
					actor,
				}),
			);

			const created = await attributesRepository.createMany(
				assignments,
				session,
			);

			await auditLogService.log({
				business: businessId,
				entityType: AUDIT_ENTITY_TYPES.OFFERING_ATTRIBUTES,
				entityId: created.id,
				action: AUDIT_ACTIONS.OFFERING_CREATED,
				actor,
				requestMetadata,
				metadata: this.buildAuditMetadata(created),
			});

			await session.commitTransaction();

			return attributesPresenter.presentCollection(created);
		} catch (error) {
			await session.abortTransaction();
			throw error;
		} finally {
			await session.endSession();
		}
	}

	async getByOffering(businessId, offeringId) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureAttributeComponentSupported(offering);

		const attributes =
			await attributesRepository.findByOffering(offeringId);

		return attributesPresenter.presentCollection(attributes);
	}
}

export const attributesService = new AttributesService();

export default attributesService;
