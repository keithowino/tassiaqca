import { marketplaceOfferingPresenter } from "../presenters/index.js";
import { marketplaceOfferingRepository } from "../repositories/index.js";

/**
 * The Marketplace service is deliberately small.
 * Its responsibility is to orchestrate Marketplace behavior, not duplicate Offering business rules.
 */
class MarketplaceService {
	async listOfferings(query) {
		const result = await marketplaceOfferingRepository.findPublished(query);

		return marketplaceOfferingPresenter.presentCollection(result);
	}
}

export default new MarketplaceService();
