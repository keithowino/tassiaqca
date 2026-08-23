import { OfferingLocation } from "../models/index.js";

class LocationRepository {
	async create(data) {
		return OfferingLocation.create(data);
	}

	async findByOffering(offeringId) {
		return OfferingLocation.findOne({
			offering: offeringId,
		});
	}

	async findByOfferingAndBusiness(businessId, offeringId) {
		return OfferingLocation.findOne({
			business: businessId,
			offering: offeringId,
		});
	}

	async save(location) {
		return location.save();
	}

	async deleteByOffering(offeringId) {
		return OfferingLocation.deleteOne({
			offering: offeringId,
		});
	}
}

export const locationRepository = new LocationRepository();

export default locationRepository;
