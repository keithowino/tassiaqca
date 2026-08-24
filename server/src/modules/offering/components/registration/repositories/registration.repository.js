import { OfferingRegistration } from "../models/index.js";

class RegistrationRepository {
	async create(data) {
		return OfferingRegistration.create(data);
	}

	async findByOffering(offeringId) {
		return OfferingRegistration.findOne({
			offering: offeringId,
		});
	}

	async findByBusinessAndOffering(businessId, offeringId) {
		return OfferingRegistration.findOne({
			business: businessId,
			offering: offeringId,
		});
	}

	async save(registration) {
		return registration.save();
	}

	async deleteByOffering(offeringId) {
		return OfferingRegistration.deleteOne({
			offering: offeringId,
		});
	}
}

export const registrationRepository = new RegistrationRepository();

export default registrationRepository;
