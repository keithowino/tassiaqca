import CalendarBuilder from "./calendar.builder.js";

function createCalendarAssignment({ businessId, offeringId, data, actor }) {
	return new CalendarBuilder()
		.setBusiness(businessId)
		.setOffering(offeringId)
		.setName(data.name ?? "")
		.setTimezone(data.timezone ?? "")
		.setType(data.type ?? "")
		.setActive(data.active ?? "")
		.setCreatedBy(actor.id)
		.setUpdatedBy(actor.id)
		.build();
}

export default {
	createCalendarAssignment,
};
