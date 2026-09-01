import {
	AppError,
	ErrorCodes,
	HTTP_STATUS,
} from "../../../../../shared/index.js";

import { offeringProfileRepository } from "../repositories/index.js";
import { offeringProfilePresenter } from "../presenters/index.js";

class OfferingProfileService {
	async getBySlug(slug) {
		const offering =
			await offeringProfileRepository.findPublishedBySlug(slug);

		if (!offering) {
			throw new AppError(
				"Offering not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		return offeringProfilePresenter.present(offering);
	}
}

export default new OfferingProfileService();
