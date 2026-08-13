class CategoriesBuilder {
	constructor() {
		this.categories = {};
	}

	setBusiness(businessId) {
		this.categories.business = businessId;
		return this;
	}

	setOffering(offeringId) {
		this.categories.offering = offeringId;
		return this;
	}

	setCategory(categoryId) {
		this.categories.category = categoryId;
		return this;
	}

	setCreatedBy(userId) {
		this.categories.createdBy = userId;
		return this;
	}

	setUpdatedBy(userId) {
		this.categories.updatedBy = userId;
		return this;
	}

	build() {
		return Object.freeze({
			...this.categories,
		});
	}
}

export default CategoriesBuilder;
