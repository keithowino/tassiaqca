import mongoose from "mongoose";

import { pricingFactory } from "../builders/index.js";
import { pricingPresenter } from "../presenters/index.js";
import { pricingRepository } from "../repositories/index.js";

import { offeringRepository } from "../../../repositories/index.js";
import businessService from "../../../../business/services/business.service.js";

import { HTTP_STATUS } from "../../../../../shared/constants/index.js";
import { AppError, ErrorCodes } from "../../../../../shared/errors/index.js";

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
	/**
	 * Ensures that the supplied business exists.
	 */
	async ensureBusinessExists(businessId) {
		return businessService.ensureExists(businessId);
	}

	/**
	 * Ensures that the Offering exists and belongs to the supplied business.
	 */
	async ensureOfferingExists(businessId, offeringId) {
		const offering = await offeringRepository.findByBusinessAndId(
			businessId,
			offeringId,
		);

		if (!offering) {
			throw new AppError(
				"Offering not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		return offering;
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
	async setCurrentPrice({ businessId, offeringId, data, actor }) {
		await this.ensureBusinessExists(businessId);

		await this.ensureOfferingExists(businessId, offeringId);

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
		await this.ensureBusinessExists(businessId);

		await this.ensureOfferingExists(businessId, offeringId);

		const pricing =
			await pricingRepository.findCurrentByOffering(offeringId);

		return pricingPresenter.present(pricing);
	}

	async getHistory(businessId, offeringId) {
		await this.ensureBusinessExists(businessId);

		await this.ensureOfferingExists(businessId, offeringId);

		const history =
			await pricingRepository.findHistoryByOffering(offeringId);

		return pricingPresenter.presentCollection(history);
	}
}

export const pricingService = new PricingService();

export default pricingService;
