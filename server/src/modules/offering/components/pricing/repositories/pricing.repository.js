import { OFFERING_PRICE_STATUS } from "../../../../../shared/index.js";
import { OfferingPricing } from "../models/index.js";

class PricingRepository {
	async create(data, session = null) {
		const [pricing] = await OfferingPricing.create([data], {
			session,
		});

		return pricing;
	}

	async save(pricing, session = null) {
		return pricing.save({
			session,
		});
	}

	async findById(id) {
		return OfferingPricing.findById(id);
	}

	async findCurrentByOffering(offeringId, session = null) {
		return OfferingPricing.findOne({
			offering: offeringId,
			isCurrent: true,
		}).session(session);
	}

	async findHistoryByOffering(offeringId) {
		return OfferingPricing.find({
			offering: offeringId,
		}).sort({
			effectiveFrom: -1,
		});
	}

	async findCurrentByBusiness(businessId) {
		return OfferingPricing.find({
			business: businessId,
			isCurrent: true,
		}).sort({
			createdAt: -1,
		});
	}

	async expireCurrentPrice(
		offeringId,
		{ effectiveTo = new Date(), updatedBy = null } = {},
		session = null,
	) {
		const current = await OfferingPricing.findOne({
			offering: offeringId,
			isCurrent: true,
		}).session(session);

		if (!current) {
			return null;
		}

		current.isCurrent = false;
		current.effectiveTo = effectiveTo;
		current.updatedBy = updatedBy;
		current.status = OFFERING_PRICE_STATUS.INACTIVE;

		return this.save(current, session);
	}

	/**
	 * Administrative cleanup only
	 */
	async delete(id) {
		return OfferingPricing.findByIdAndDelete(id);
	}
}

export default new PricingRepository();
