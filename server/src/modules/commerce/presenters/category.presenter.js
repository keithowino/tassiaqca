import { getId } from "../../../shared/index.js";

class CategoryPresenter {
	present(category) {
		if (!category) {
			return null;
		}

		return {
			id: getId(category),

			businessId: getId(category.business),

			name: category.name,

			slug: category.slug,

			description: category.description,

			parentId: getId(category.parent),

			status: category.status,

			position: category.position,

			metadata: category.metadata,

			createdAt: category.createdAt,

			updatedAt: category.updatedAt,
		};
	}

	presentCollection(categories) {
		return categories.map((category) => this.present(category));
	}
}

export default new CategoryPresenter();
