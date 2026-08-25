class InstructorBuilder {
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

	setBusinessMember(businessMemberId) {
		this.data.businessMember = businessMemberId;
		return this;
	}

	setActive(active = true) {
		this.data.active = active;
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

export default InstructorBuilder;
