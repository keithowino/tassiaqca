import {
	AUDIT_ACTIONS,
	AUDIT_ENTITY_TYPES,
	ensureOfferingSupportsComponent,
	OFFERING_COMPONENTS,
	ensureBusinessExists,
	ensureOfferingExists,
} from "../../../../../shared/index.js";

import { auditLogService } from "../../../../audit/index.js";

import { bookingFactory } from "../builders/index.js";
import { bookingPresenter } from "../presenters/index.js";
import { bookingRepository } from "../repositories/index.js";

class BookingService {
	ensureBookingSupported(offering) {
		ensureOfferingSupportsComponent(
			offering,
			OFFERING_COMPONENTS.BOOKING,
			"Booking is not supported for this offering.",
		);
	}

	ensureSchedulingSupported(offering) {
		ensureOfferingSupportsComponent(
			offering,
			OFFERING_COMPONENTS.SCHEDULING,
			"Booking requires Scheduling support.",
		);
	}

	buildAuditMetadata(booking) {
		return {
			offeringId: booking.offering,
			bookingId: booking.id,
			active: booking.active,
			confirmationRequired: booking.confirmationRequired,
			minimumAdvanceMinutes: booking.minimumAdvanceMinutes,
			maximumAdvanceMinutes: booking.maximumAdvanceMinutes,
			cancellationWindowMinutes: booking.cancellationWindowMinutes,
		};
	}

	async setBooking({ businessId, offeringId, data, actor, requestMetadata }) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureBookingSupported(offering);
		this.ensureSchedulingSupported(offering);

		let booking = await bookingRepository.findByBusinessAndOffering(
			businessId,
			offeringId,
		);

		if (!booking) {
			const assignment = bookingFactory.createBookingAssignment({
				businessId,
				offeringId,
				data,
				actor,
			});

			booking = await bookingRepository.create(assignment);

			await auditLogService.log({
				business: businessId,
				entityType: AUDIT_ENTITY_TYPES.OFFERING_BOOKING,
				entityId: booking.id,
				action: AUDIT_ACTIONS.OFFERING_BOOKING_CREATED,
				actor,
				requestMetadata,
				metadata: this.buildAuditMetadata(booking),
			});
		} else {
			booking.active = data.active ?? booking.active;

			booking.confirmationRequired =
				data.confirmationRequired ?? booking.confirmationRequired;

			if (data.minimumAdvanceMinutes !== undefined) {
				booking.minimumAdvanceMinutes = data.minimumAdvanceMinutes;
			}

			if (data.maximumAdvanceMinutes !== undefined) {
				booking.maximumAdvanceMinutes = data.maximumAdvanceMinutes;
			}

			if (data.cancellationWindowMinutes !== undefined) {
				booking.cancellationWindowMinutes =
					data.cancellationWindowMinutes;
			}

			booking.updatedBy = actor.id;

			await bookingRepository.save(booking);

			await auditLogService.log({
				business: businessId,
				entityType: AUDIT_ENTITY_TYPES.OFFERING_BOOKING,
				entityId: booking.id,
				action: AUDIT_ACTIONS.OFFERING_BOOKING_UPDATED,
				actor,
				requestMetadata,
				metadata: this.buildAuditMetadata(booking),
			});
		}

		return bookingPresenter.present(booking);
	}

	async getBooking(businessId, offeringId) {
		await ensureBusinessExists(businessId);

		const offering = await ensureOfferingExists(businessId, offeringId);

		this.ensureBookingSupported(offering);
		this.ensureSchedulingSupported(offering);

		const booking = await bookingRepository.findByBusinessAndOffering(
			businessId,
			offeringId,
		);

		return bookingPresenter.present(booking);
	}
}

export const bookingService = new BookingService();

export default bookingService;
