import { searchOfferingPresenter } from "../presenters/index.js";
import { searchOfferingRepository } from "../repositories/index.js";

class SearchOfferingService {
	async search(query = {}) {
		const result = await searchOfferingRepository.findPublished(query);

		return searchOfferingPresenter.presentCollection(result);
	}
}

export default new SearchOfferingService();
