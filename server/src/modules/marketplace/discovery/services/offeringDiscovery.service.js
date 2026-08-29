import { offeringDiscoveryRepository } from "../repositories/index.js";
import { offeringDiscoveryPresenter } from "../presenters/index.js";

class OfferingDiscoveryService {
	async listFeatured(query) {
		const result = await offeringDiscoveryRepository.findFeatured(query);

		return offeringDiscoveryPresenter.presentCollection(result);
	}
}

export default new OfferingDiscoveryService();
