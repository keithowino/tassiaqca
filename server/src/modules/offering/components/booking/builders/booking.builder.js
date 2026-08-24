class BookingBuilder {
	constructor() {
		this.booking = {};
	}

	setBusiness(businessId) {
		this.booking.business = businessId;
		return this;
	}

	setOffering(offeringId) {
		this.booking.offering = offeringId;
		return this;
	}

	setActive(active) {
		this.booking.active = active;
		return this;
	}

	setConfirmationRequired(confirmationRequired) {
		this.booking.confirmationRequired = confirmationRequired;
		return this;
	}

	setMinimumAdvanceMinutes(minimumAdvanceMinutes) {
		this.booking.minimumAdvanceMinutes = minimumAdvanceMinutes;
		return this;
	}

	setMaximumAdvanceMinutes(maximumAdvanceMinutes) {
		this.booking.maximumAdvanceMinutes = maximumAdvanceMinutes;
		return this;
	}

	setCancellationWindowMinutes(cancellationWindowMinutes) {
		this.booking.cancellationWindowMinutes = cancellationWindowMinutes;
		return this;
	}

	setCreatedBy(userId) {
		this.booking.createdBy = userId;
		return this;
	}

	setUpdatedBy(userId) {
		this.booking.updatedBy = userId;
		return this;
	}

	build() {
		return Object.freeze({
			...this.booking,
		});
	}
}

export default BookingBuilder;
