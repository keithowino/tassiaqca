import { OfferingSeo } from "../models/index.js";

class SeoRepository {
	async create(data) {
		return OfferingSeo.create(data);
	}

	async findByOffering(offeringId) {
		return OfferingSeo.findOne({
			offering: offeringId,
		});
	}

	async findByBusinessAndOffering(businessId, offeringId) {
		return OfferingSeo.findOne({
			business: businessId,
			offering: offeringId,
		});
	}

	async save(seo) {
		return seo.save();
	}

	async deleteByOffering(offeringId) {
		return OfferingSeo.findOneAndDelete({
			offering: offeringId,
		});
	}
}

export default new SeoRepository();
