import DurationBuilder from "./duration.builder.js";

function createDuration({ businessId, offeringId, data, actor }) {
	return new DurationBuilder()
		.setBusiness(businessId)
		.setOffering(offeringId)
		.setDuration(data.duration)
		.setUnit(data.unit)
		.setStatus(data.status)
		.setCreatedBy(actor.id)
		.setUpdatedBy(actor.id)
		.build();
}

export default {
	createDuration,
};
