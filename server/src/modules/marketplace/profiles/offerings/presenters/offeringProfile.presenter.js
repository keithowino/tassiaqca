import { marketplaceOfferingPresenter } from "../../../presenters/index.js";

class OfferingProfilePresenter {
	present(offering) {
		if (!offering) {
			return null;
		}

		/**
		 * Later, when Offering Profiles acquire profile-specific information—categories, variants, media, pricing, availability, etc.—this presenter becomes the place where the richer profile representation can be composed.
		 */
		return marketplaceOfferingPresenter.present(offering);
	}
}

export default new OfferingProfilePresenter();
