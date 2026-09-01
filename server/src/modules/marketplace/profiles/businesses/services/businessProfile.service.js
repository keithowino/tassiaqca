import { businessProfileRepository } from "../repositories/index.js";
import { businessProfilePresenter } from "../presenters/index.js";
import { marketplaceOfferingPresenter } from "../../../presenters/index.js";

class BusinessProfileService {
	async getBySlug(slug) {
		const business =
			await businessProfileRepository.findBusinessBySlug(slug);

		if (!business || !business.active) {
			return null;
		}

		let result = {};

		const businessOfferings =
			await businessProfileRepository.findPublishedOfferings(
				business._id,
			);

		result.offerings = businessOfferings.data;

		const offerings =
			marketplaceOfferingPresenter.presentCollection(result);

		return businessProfilePresenter.present(business, offerings.data);
	}
}

export default new BusinessProfileService();
