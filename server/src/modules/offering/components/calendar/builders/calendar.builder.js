class CalendarBuilder {
	constructor() {
		this.calendar = {};
	}

	setBusiness(businessId) {
		this.calendar.business = businessId;
		return this;
	}

	setOffering(offeringId) {
		this.calendar.offering = offeringId;
		return this;
	}

	setName(name) {
		this.calendar.name = name;
		return this;
	}

	setTimezone(timezone) {
		this.calendar.timezone = timezone;
		return this;
	}

	setType(type) {
		this.calendar.type = type;
		return this;
	}

	setActive(active) {
		this.calendar.active = active;
		return this;
	}

	setCreatedBy(userId) {
		this.calendar.createdBy = userId;
		return this;
	}

	setUpdatedBy(userId) {
		this.calendar.updatedBy = userId;
		return this;
	}

	build() {
		return Object.freeze({
			...this.calendar,
		});
	}
}

export default CalendarBuilder;
