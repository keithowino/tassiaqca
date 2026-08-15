class AttributesBuilder {
	constructor() {
		this.attributes = {};
	}

	setBusiness(businessId) {
		this.attributes.business = businessId;
		return this;
	}

	setOffering(offeringId) {
		this.attributes.offering = offeringId;
		return this;
	}

	setName(name) {
		this.attributes.name = name;
		return this;
	}

	setValues(values) {
		this.attributes.values = values;
		return this;
	}

	setCreatedBy(userId) {
		this.attributes.createdBy = userId;
		return this;
	}

	setUpdatedBy(userId) {
		this.attributes.updatedBy = userId;
		return this;
	}

	build() {
		return Object.freeze({
			...this.attributes,
		});
	}
}

export default AttributesBuilder;
