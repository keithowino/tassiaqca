class VariantsBuilder {
	constructor() {
		this.variant = {};
	}

	setBusiness(businessId) {
		this.variant.business = businessId;
		return this;
	}

	setOffering(offeringId) {
		this.variant.offering = offeringId;
		return this;
	}

	setSku(sku) {
		this.variant.sku = sku;
		return this;
	}

	setSlug(slug) {
		this.variant.slug = slug;
		return this;
	}

	setAttributes(attributes) {
		this.variant.attributes = attributes;
		return this;
	}

	setAttributeCount(count) {
		this.variant.attributeCount = count;
		return this;
	}

	setAttributeSignature(signature) {
		this.variant.attributeSignature = signature;
		return this;
	}

	setStatus(status) {
		this.variant.status = status;
		return this;
	}

	setCreatedBy(userId) {
		this.variant.createdBy = userId;
		return this;
	}

	setUpdatedBy(userId) {
		this.variant.updatedBy = userId;
		return this;
	}

	build() {
		return Object.freeze({
			...this.variant,
		});
	}
}

export default VariantsBuilder;
