import { OfferingScheduling } from "../models/index.js";

class SchedulingRepository {
	async create(data) {
		return OfferingScheduling.create(data);
	}

	async findByOffering(offeringId) {
		return OfferingScheduling.findOne({
			offering: offeringId,
		});
	}

	async findByBusinessAndOffering(businessId, offeringId) {
		return OfferingScheduling.findOne({
			business: businessId,
			offering: offeringId,
		});
	}

	async save(scheduling) {
		return scheduling.save();
	}

	async deleteByOffering(offeringId) {
		return OfferingScheduling.deleteOne({
			offering: offeringId,
		});
	}
}

export const schedulingRepository = new SchedulingRepository();

export default schedulingRepository;
