import { getId } from "../../../../../shared/index.js";

class BookingPresenter {
	present(booking) {
		if (!booking) {
			return null;
		}

		return {
			id: booking.id,
			businessId: getId(booking.business),
			offeringId: getId(booking.offering),
			active: booking.active,
			confirmationRequired: booking.confirmationRequired,
			minimumAdvanceMinutes: booking.minimumAdvanceMinutes,
			maximumAdvanceMinutes: booking.maximumAdvanceMinutes,
			cancellationWindowMinutes: booking.cancellationWindowMinutes,
			createdBy: getId(booking.createdBy),
			updatedBy: getId(booking.updatedBy),
			createdAt: booking.createdAt,
			updatedAt: booking.updatedAt,
		};
	}
}

export const bookingPresenter = new BookingPresenter();

export default bookingPresenter;
