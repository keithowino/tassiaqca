import { OFFERING_PRICE_STATUS } from "../../../../../shared/constants/index.js";
import { Pricing } from "../models/index.js";

class PricingRepository {
	async create(data, session = null) {
		const [pricing] = await Pricing.create([data], {
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
		return Pricing.findById(id);
	}

	async findCurrentByOffering(offeringId, session = null) {
		return Pricing.findOne({
			offering: offeringId,
			isCurrent: true,
		}).session(session);
	}

	async findHistoryByOffering(offeringId) {
		return Pricing.find({
			offering: offeringId,
		}).sort({
			effectiveFrom: -1,
		});
	}

	async findCurrentByBusiness(businessId) {
		return Pricing.find({
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
		const current = await Pricing.findOne({
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
		return Pricing.findByIdAndDelete(id);
	}
}

export default new PricingRepository();
