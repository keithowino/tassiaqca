import { OfferingBooking } from "../models/index.js";

class BookingRepository {
	async create(data) {
		return OfferingBooking.create(data);
	}

	async findByOffering(offeringId) {
		return OfferingBooking.findOne({
			offering: offeringId,
		});
	}

	async findByBusinessAndOffering(businessId, offeringId) {
		return OfferingBooking.findOne({
			business: businessId,
			offering: offeringId,
		});
	}

	async save(booking) {
		return booking.save();
	}

	async deleteByOffering(offeringId) {
		return OfferingBooking.deleteOne({
			offering: offeringId,
		});
	}
}

export const bookingRepository = new BookingRepository();

export default bookingRepository;
