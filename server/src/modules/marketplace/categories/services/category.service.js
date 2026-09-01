import { marketplaceCategoryRepository } from "../repositories/index.js";

class MarketplaceCategoryService {
	async list(query = {}) {
		return marketplaceCategoryRepository.findPublished(query);
	}
}

export default new MarketplaceCategoryService();
