class PricingBuilder {
	constructor() {
		this.pricing = {};
	}

	setBusiness(businessId) {
		this.pricing.business = businessId;
		return this;
	}

	setOffering(offeringId) {
		this.pricing.offering = offeringId;
		return this;
	}

	setAmount(amount) {
		this.pricing.amount = amount;
		return this;
	}

	setCostPrice(costPrice) {
		this.pricing.costPrice = costPrice ?? null;
		return this;
	}

	setCurrency(currency) {
		this.pricing.currency = currency;
		return this;
	}

	setBillingModel(billingModel) {
		this.pricing.billingModel = billingModel;
		return this;
	}

	setEffectiveFrom(date) {
		this.pricing.effectiveFrom = date;
		return this;
	}

	setEffectiveTo(date) {
		this.pricing.effectiveTo = date;
		return this;
	}

	setCurrent(isCurrent = true) {
		this.pricing.isCurrent = isCurrent;
		return this;
	}

	setStatus(status) {
		this.pricing.status = status;
		return this;
	}

	setChangeReason(reason) {
		this.pricing.changeReason = reason;
		return this;
	}

	setMetadata(metadata = {}) {
		this.pricing.metadata = metadata;
		return this;
	}

	setCreatedBy(userId) {
		this.pricing.createdBy = userId;
		return this;
	}

	setUpdatedBy(userId) {
		this.pricing.updatedBy = userId;
		return this;
	}

	build() {
		return Object.freeze({
			...this.pricing,
		});
	}
}

export default PricingBuilder;
