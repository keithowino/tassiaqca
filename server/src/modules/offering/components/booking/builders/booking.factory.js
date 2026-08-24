import BookingBuilder from "./booking.builder.js";

function createBookingAssignment({ businessId, offeringId, data, actor }) {
	return new BookingBuilder()
		.setBusiness(businessId)
		.setOffering(offeringId)
		.setActive(data.active ?? true)
		.setConfirmationRequired(data.confirmationRequired ?? false)
		.setMinimumAdvanceMinutes(data.minimumAdvanceMinutes ?? 0)
		.setMaximumAdvanceMinutes(data.maximumAdvanceMinutes ?? null)
		.setCancellationWindowMinutes(data.cancellationWindowMinutes ?? 0)
		.setCreatedBy(actor.id)
		.setUpdatedBy(actor.id)
		.build();
}

export default {
	createBookingAssignment,
};
