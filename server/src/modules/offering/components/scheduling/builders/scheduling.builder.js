class SchedulingBuilder {
	constructor() {
		this.scheduling = {};
	}

	setBusiness(businessId) {
		this.scheduling.business = businessId;
		return this;
	}

	setOffering(offeringId) {
		this.scheduling.offering = offeringId;
		return this;
	}

	setMode(mode) {
		this.scheduling.mode = mode;
		return this;
	}

	setTimezone(timezone) {
		this.scheduling.timezone = timezone;
		return this;
	}

	setActive(active) {
		this.scheduling.active = active;
		return this;
	}

	setCreatedBy(userId) {
		this.scheduling.createdBy = userId;
		return this;
	}

	setUpdatedBy(userId) {
		this.scheduling.updatedBy = userId;
		return this;
	}

	build() {
		return Object.freeze({
			...this.scheduling,
		});
	}
}

export default SchedulingBuilder;
