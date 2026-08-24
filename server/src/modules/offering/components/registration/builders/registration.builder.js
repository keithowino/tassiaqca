class RegistrationBuilder {
	constructor() {
		this.registration = {};
	}

	setBusiness(businessId) {
		this.registration.business = businessId;
		return this;
	}

	setOffering(offeringId) {
		this.registration.offering = offeringId;
		return this;
	}

	setActive(active) {
		this.registration.active = active;
		return this;
	}

	setApprovalRequired(approvalRequired) {
		this.registration.approvalRequired = approvalRequired;
		return this;
	}

	setMaximumRegistrations(maximumRegistrations) {
		this.registration.maximumRegistrations = maximumRegistrations;
		return this;
	}

	setRegistrationDeadlineMinutes(registrationDeadlineMinutes) {
		this.registration.registrationDeadlineMinutes =
			registrationDeadlineMinutes;
		return this;
	}

	setCreatedBy(userId) {
		this.registration.createdBy = userId;
		return this;
	}

	setUpdatedBy(userId) {
		this.registration.updatedBy = userId;
		return this;
	}

	build() {
		return Object.freeze({
			...this.registration,
		});
	}
}

export default RegistrationBuilder;
