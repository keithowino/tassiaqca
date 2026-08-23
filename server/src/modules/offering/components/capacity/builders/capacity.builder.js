class CapacityBuilder {
	constructor() {
		this.capacity = {};
	}

	setBusiness(businessId) {
		this.capacity.business = businessId;
		return this;
	}

	setOffering(offeringId) {
		this.capacity.offering = offeringId;
		return this;
	}

	setLimit(limit) {
		this.capacity.limit = limit;
		return this;
	}

	setCreatedBy(userId) {
		this.capacity.createdBy = userId;
		return this;
	}

	setUpdatedBy(userId) {
		this.capacity.updatedBy = userId ?? null;
		return this;
	}

	build() {
		return this.capacity;
	}
}

export default CapacityBuilder;
