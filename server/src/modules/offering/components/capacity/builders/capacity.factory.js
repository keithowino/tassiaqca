import CapacityBuilder from "./capacity.builder.js";

function createCapacityAssignment({ businessId, offeringId, data, actor }) {
	return new CapacityBuilder()
		.setBusiness(businessId)
		.setOffering(offeringId)
		.setLimit(data.limit)
		.setCreatedBy(actor.id)
		.setUpdatedBy(actor.id)
		.build();
}

export default {
	createCapacityAssignment,
};
