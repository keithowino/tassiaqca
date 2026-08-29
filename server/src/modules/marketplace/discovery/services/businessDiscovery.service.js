import { businessDiscoveryRepository } from "../repositories/index.js";
import { businessDiscoveryPresenter } from "../presenters/index.js";

class BusinessDiscoveryService {
	async listBusinesses(query) {
		const result = await businessDiscoveryRepository.findPublished(query);

		return businessDiscoveryPresenter.presentCollection(result);
	}
}

export default new BusinessDiscoveryService();
