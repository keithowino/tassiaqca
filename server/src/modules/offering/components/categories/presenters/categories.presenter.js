import { getId } from "../../../../../shared/utils/presenter.js";

function present(assignment) {
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

function presentCollection(assignments = []) {
	return assignments.map(present);
}

export default {
	present,
	presentCollection,
};
