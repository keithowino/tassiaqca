import InstructorBuilder from "./instructor.builder.js";

function createInstructorAssignment({
	businessId,
	offeringId,
	businessMemberId,
	actor,
}) {
	return new InstructorBuilder()
		.setBusiness(businessId)
		.setOffering(offeringId)
		.setBusinessMember(businessMemberId)
		.setActive(true)
		.setCreatedBy(actor.id)
		.setUpdatedBy(actor.id)
		.build();
}

export default {
	createInstructorAssignment,
};
