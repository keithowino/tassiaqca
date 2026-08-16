class TagsBuilder {
	constructor() {
		this.tags = {};
	}

	setBusiness(businessId) {
		this.tags.business = businessId;
		return this;
	}

	setOffering(offeringId) {
		this.tags.offering = offeringId;
		return this;
	}

	setTag(tag) {
		this.tags.tag = tag;
		return this;
	}

	setCreatedBy(userId) {
		this.tags.createdBy = userId;
		return this;
	}

	setUpdatedBy(userId) {
		this.tags.updatedBy = userId;
		return this;
	}

	build() {
		return Object.freeze({
			...this.tags,
		});
	}
}

export default TagsBuilder;
