import { OfferingCapacity } from "../models/index.js";

class CapacityRepository {
	async create(data) {
		return OfferingCapacity.create(data);
	}

	async findByOffering(offeringId) {
		return OfferingCapacity.findOne({
			offering: offeringId,
		});
	}

	async findByOfferingAndBusiness(businessId, offeringId) {
		return OfferingCapacity.findOne({
			business: businessId,
			offering: offeringId,
		});
	}

	async save(capacity) {
		return capacity.save();
	}

	async deleteByOffering(offeringId) {
		return OfferingCapacity.deleteOne({
			offering: offeringId,
		});
	}
}

export const capacityRepository = new CapacityRepository();

export default capacityRepository;
