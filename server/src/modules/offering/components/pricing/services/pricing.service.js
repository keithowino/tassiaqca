import mongoose from "mongoose";

import { pricingFactory } from "../builders/index.js";
import { pricingPresenter } from "../presenters/index.js";
import { pricingRepository } from "../repositories/index.js";

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

/**
 * Pricing Domain Service
 *
 * Owns pricing business rules.
 *
 * Pricing is immutable.
 * Updating a price creates a new version.
 *
 * The only public write operation is setting the current price.
 * Internally, the service determines whether it is the first
 * price or a replacement.
 */
class PricingService {
	ensurePricingComponentSupported(offering) {
		return ensureOfferingSupportsComponent(
			offering,
			OFFERING_COMPONENTS.PRICING,
			"Pricing is not supported for this offering.",
		);
	}

	buildAuditMetadata(data) {
		return {};
	}

	/**
	 * Sets the current price for an Offering.
	 *
	 * Validation of the pricing payload is performed by the
	 * Pricing Component before this service is invoked.
	 *
	 * Persistence is transactional:
	 *
	 * 1. Ensure business exists.
	 * 2. Ensure Offering exists within this business.
	 * 3. Start transaction.
	 * 4. Find current price.
	 * 5. Expire current price if one exists.
	 * 6. Create new immutable price.
	 * 7. Commit transaction.
	 * 8. Return created price.
	 */
	async setCurrentPrice({
		businessId,
		offeringId,
		data,
		actor,
		requestMetadata,
	}) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensurePricingComponentSupported(offering);

		const session = await mongoose.startSession();

		try {
			session.startTransaction();

			const current = await pricingRepository.findCurrentByOffering(
				offeringId,
				session,
			);

			if (current) {
				await pricingRepository.expireCurrentPrice(
					offeringId,
					{
						effectiveTo: new Date(),
						updatedBy: actor.id,
					},
					session,
				);
			}

			const pricing = pricingFactory.createPricing({
				businessId,
				offeringId,
				data,
				actor,
			});

			const created = await pricingRepository.create(pricing, session);

			await auditLogService.log({
				business: businessId,
				entityType: AUDIT_ENTITY_TYPES.OFFERING_PRICING,
				entityId: created.id,
				action: AUDIT_ACTIONS.OFFERING_PRICING_CREATED,
				actor,
				requestMetadata,
				metadata: this.buildAuditMetadata(created),
			});

			await session.commitTransaction();

			return pricingPresenter.present(created);
		} catch (error) {
			await session.abortTransaction();

			throw error;
		} finally {
			await session.endSession();
		}
	}

	async getCurrent(businessId, offeringId) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensurePricingComponentSupported(offering);

		const pricing =
			await pricingRepository.findCurrentByOffering(offeringId);

		return pricingPresenter.present(pricing);
	}

	async getHistory(businessId, offeringId) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensurePricingComponentSupported(offering);

		const history =
			await pricingRepository.findHistoryByOffering(offeringId);

		return pricingPresenter.presentCollection(history);
	}
}

export const pricingService = new PricingService();

export default pricingService;
