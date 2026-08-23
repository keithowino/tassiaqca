import { OfferingCalendar } from "../models/index.js";

class CalendarRepository {
	async create(data) {
		return OfferingCalendar.create(data);
	}

	async findByOffering(offeringId) {
		return OfferingCalendar.findOne({
			offering: offeringId,
		});
	}

	async findByOfferingAndBusiness(businessId, offeringId) {
		return OfferingCalendar.findOne({
			business: businessId,
			offering: offeringId,
		});
	}

	async save(calendar) {
		return calendar.save();
	}

	async deleteByOffering(offeringId) {
		return OfferingCalendar.deleteOne({
			offering: offeringId,
		});
	}
}

export const calendarRepository = new CalendarRepository();

export default calendarRepository;
