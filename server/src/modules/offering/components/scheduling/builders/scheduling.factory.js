import SchedulingBuilder from "./scheduling.builder.js";

function createSchedulingAssignment({ businessId, offeringId, data, actor }) {
	return new SchedulingBuilder()
		.setBusiness(businessId)
		.setOffering(offeringId)
		.setMode(data.mode)
		.setTimezone(data.timezone)
		.setActive(data.active ?? true)
		.setCreatedBy(actor.id)
		.setUpdatedBy(actor.id)
		.build();
}

export default {
	createSchedulingAssignment,
};
