import { marketplaceOfferingPresenter } from "../../presenters/index.js";
import { trendingOfferingRepository } from "../repositories/index.js";

class TrendingOfferingService {
	async list(query) {
		const result = await trendingOfferingRepository.findTrending(query);

		return marketplaceOfferingPresenter.presentCollection(result);
	}
}

export default new TrendingOfferingService();
