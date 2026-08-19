import { getId } from "../../../../../shared/index.js";

class CategoriesPresenter {
	present(assignment) {
		if (!assignment) {
			return null;
		}

		return {
			id: assignment.id,

			business: getId(assignment.business),

			offering: getId(assignment.offering),

			category: assignment.category
				? {
						id: getId(assignment.category),
						name: assignment.category.name,
						slug: assignment.category.slug,
					}
				: assignment.category,

			createdBy: assignment.createdBy,

			updatedBy: assignment.updatedBy,

			createdAt: assignment.createdAt,

			updatedAt: assignment.updatedAt,
		};
	}

	presentCollection(assignments = []) {
		return assignments.map((item) => this.present(item));
	}
}

export const categoriesPresenter = new CategoriesPresenter();

export default categoriesPresenter;
