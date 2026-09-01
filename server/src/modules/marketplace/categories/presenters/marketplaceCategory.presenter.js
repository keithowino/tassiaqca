import { getId } from "../../../../shared/index.js";

class MarketplaceCategoryPresenter {
	present(category) {
		if (!category) {
			return null;
		}

		return {
			id: getId(category),
			businessId: getId(category.business),
			name: category.name,
			slug: category.slug,
			description: category.description ?? "",
			parentId: getId(category.parent),
			position: category.position ?? 0,
			offeringCount: category.offeringCount ?? 0,
		};
	}

	presentCollection(categories) {
		return categories.map((category) => this.present(category));
	}
}

export default new MarketplaceCategoryPresenter();
