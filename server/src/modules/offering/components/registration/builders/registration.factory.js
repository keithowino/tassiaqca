import RegistrationBuilder from "./registration.builder.js";

function createRegistrationAssignment({ businessId, offeringId, data, actor }) {
	return new RegistrationBuilder()
		.setBusiness(businessId)
		.setOffering(offeringId)
		.setActive(data.active ?? true)
		.setApprovalRequired(data.approvalRequired ?? false)
		.setMaximumRegistrations(data.maximumRegistrations)
		.setRegistrationDeadlineMinutes(data.registrationDeadlineMinutes)
		.setCreatedBy(actor.id)
		.setUpdatedBy(actor.id)
		.build();
}

export default {
	createRegistrationAssignment,
};
