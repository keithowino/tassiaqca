import { getId } from "../../../shared/utils/presenter.js";

class CategoryPresenter {
	present(category) {
		if (!category) {
			return null;
		}

		const businessId = getId(category.business);
		const parentCategoryId = getId(category.parentCategory);
		const createdBy = getId(category.createdBy);
		const updatedBy = getId(category.updatedBy);

		return {
			id: category.id,

			businessId,

			name: category.name,

			slug: category.slug,

			description: category.description,

			parentCategoryId,

			parentCategoryName: category.parentCategory?.name ?? null,

			sortOrder: category.sortOrder,

			status: category.status,

			createdBy,

			updatedBy,

			createdAt: category.createdAt,

			updatedAt: category.updatedAt,
		};
	}

	presentCollection(categories) {
		return categories.map((category) => this.present(category));
	}
}

export default new CategoryPresenter();
