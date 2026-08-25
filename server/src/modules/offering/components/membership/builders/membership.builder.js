class MembershipBuilder {
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

	setDurationMinutes(durationMinutes) {
		this.data.durationMinutes = durationMinutes ?? null;
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
		return {
			...this.data,
		};
	}
}

export default MembershipBuilder;
