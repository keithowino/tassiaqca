import { marketplaceOfferingPresenter } from "../../presenters/index.js";

class SearchOfferingPresenter {
	presentCollection(result) {
		return marketplaceOfferingPresenter.presentCollection(result);
	}
}

export default new SearchOfferingPresenter();
