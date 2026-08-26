class SubscriptionBuilder {
	constructor() {
		this.data = {};
	}

	setBusiness(businessId) {
		this.data.business = businessId;
		return this;
	}

	setOffering(offeringId) {
		this.data.offering = offeringId;
		return this;
	}

	setActive(active) {
		this.data.active = active;
		return this;
	}

	setApprovalRequired(approvalRequired) {
		this.data.approvalRequired = approvalRequired;
		return this;
	}

	setBillingIntervalUnit(billingIntervalUnit) {
		this.data.billingIntervalUnit = billingIntervalUnit;
		return this;
	}

	setBillingIntervalCount(billingIntervalCount) {
		this.data.billingIntervalCount = billingIntervalCount;
		return this;
	}

	setRenewable(renewable) {
		this.data.renewable = renewable;
		return this;
	}

	setCreatedBy(userId) {
		this.data.createdBy = userId;
		return this;
	}

	setUpdatedBy(userId) {
		this.data.updatedBy = userId;
		return this;
	}

	build() {
		return { ...this.data };
	}
}

export default SubscriptionBuilder;
