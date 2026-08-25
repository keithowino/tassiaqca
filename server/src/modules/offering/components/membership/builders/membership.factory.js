import MembershipBuilder from "./membership.builder.js";

function createMembershipAssignment({ businessId, offeringId, data, actor }) {
	return new MembershipBuilder()
		.setBusiness(businessId)
		.setOffering(offeringId)
		.setActive(data.active ?? true)
		.setApprovalRequired(data.approvalRequired ?? false)
		.setDurationMinutes(data.durationMinutes)
		.setRenewable(data.renewable ?? false)
		.setCreatedBy(actor.id)
		.setUpdatedBy(actor.id)
		.build();
}

export const membershipFactory = {
	createMembershipAssignment,
};

export default membershipFactory;
