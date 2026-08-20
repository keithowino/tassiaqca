class DurationBuilder {
	constructor() {
		this.data = {};
	}

	setBusiness(business) {
		this.data.business = business;
		return this;
	}

	setOffering(offering) {
		this.data.offering = offering;
		return this;
	}

	setDuration(duration) {
		this.data.duration = duration;
		return this;
	}

	setUnit(unit) {
		this.data.unit = unit;
		return this;
	}

	setStatus(status) {
		this.data.status = status;
		return this;
	}

	setCreatedBy(createdBy) {
		this.data.createdBy = createdBy;
		return this;
	}

	setUpdatedBy(updatedBy) {
		this.data.updatedBy = updatedBy;
		return this;
	}

	build() {
		return {
			...this.data,
		};
	}
}

export default DurationBuilder;
