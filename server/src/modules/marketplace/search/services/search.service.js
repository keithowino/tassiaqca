import {
	businessSearchRepository,
	searchOfferingRepository,
} from "../repositories/index.js";

import {
	businessSearchPresenter,
	searchOfferingPresenter,
} from "../presenters/index.js";

class SearchService {
	async searchBusiness(query = {}) {
		const result = await businessSearchRepository.search(query);

		return businessSearchPresenter.present(result);
	}

	async searchOffering(query = {}) {
		const result = await searchOfferingRepository.findPublished(query);

		return searchOfferingPresenter.presentCollection(result);
	}
}

export default new SearchService();
