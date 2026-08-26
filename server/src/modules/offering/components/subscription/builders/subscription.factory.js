import SubscriptionBuilder from "./subscription.builder.js";

function createSubscriptionAssignment({ businessId, offeringId, data, actor }) {
	return new SubscriptionBuilder()
		.setBusiness(businessId)
		.setOffering(offeringId)
		.setActive(data.active ?? true)
		.setApprovalRequired(data.approvalRequired ?? false)
		.setBillingIntervalUnit(data.billingIntervalUnit ?? "MONTH")
		.setBillingIntervalCount(data.billingIntervalCount ?? 1)
		.setRenewable(data.renewable ?? true)
		.setCreatedBy(actor.id)
		.setUpdatedBy(actor.id)
		.build();
}

export const subscriptionFactory = {
	createSubscriptionAssignment,
};

export default subscriptionFactory;
