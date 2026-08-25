class EnrollmentBuilder {
	constructor() {
		this.enrollment = {};
	}

	setBusiness(businessId) {
		this.enrollment.business = businessId;
		return this;
	}

	setOffering(offeringId) {
		this.enrollment.offering = offeringId;
		return this;
	}

	setActive(active) {
		this.enrollment.active = active;
		return this;
	}

	setApprovalRequired(approvalRequired) {
		this.enrollment.approvalRequired = approvalRequired;
		return this;
	}

	setMaximumEnrollments(maximumEnrollments) {
		this.enrollment.maximumEnrollments = maximumEnrollments ?? null;
		return this;
	}

	setEnrollmentDeadlineMinutes(enrollmentDeadlineMinutes) {
		this.enrollment.enrollmentDeadlineMinutes =
			enrollmentDeadlineMinutes ?? null;
		return this;
	}

	setCreatedBy(userId) {
		this.enrollment.createdBy = userId;
		return this;
	}

	setUpdatedBy(userId) {
		this.enrollment.updatedBy = userId;
		return this;
	}

	build() {
		return Object.freeze({
			...this.enrollment,
		});
	}
}

export default EnrollmentBuilder;
