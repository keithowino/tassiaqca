import CapacityBuilder from "./capacity.builder.js";

function createCapacityAssignment({ businessId, offeringId, limit, actor }) {
	return new CapacityBuilder()
		.setBusiness(businessId)
		.setOffering(offeringId)
		.setLimit(limit)
		.setCreatedBy(actor.id)
		.setUpdatedBy(actor.id)
		.build();
}

export default {
	createCapacityAssignment,
};
