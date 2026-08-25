import EnrollmentBuilder from "./enrollment.builder.js";

function createEnrollmentAssignment({ businessId, offeringId, data, actor }) {
	return new EnrollmentBuilder()
		.setBusiness(businessId)
		.setOffering(offeringId)
		.setActive(data.active ?? true)
		.setApprovalRequired(data.approvalRequired ?? false)
		.setMaximumEnrollments(data.maximumEnrollments)
		.setEnrollmentDeadlineMinutes(data.enrollmentDeadlineMinutes)
		.setCreatedBy(actor.id)
		.setUpdatedBy(actor.id)
		.build();
}

export default {
	createEnrollmentAssignment,
};
