import CategoriesBuilder from "./categories.builder.js";

function createCategoryAssignment({
	businessId,
	offeringId,
	categoryId,
	actor,
}) {
	return new CategoriesBuilder()
		.setBusiness(businessId)
		.setOffering(offeringId)
		.setCategory(categoryId)
		.setCreatedBy(actor.id)
		.setUpdatedBy(actor.id)
		.build();
}

export default {
	createCategoryAssignment,
};
