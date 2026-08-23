import { getId } from "../../../../../shared/index.js";

class CalendarPresenter {
	present(calendar) {
		if (!calendar) {
			return null;
		}

		return {
			id: calendar.id,
			businessId: getId(calendar.business),
			offeringId: getId(calendar.offering),

			name: calendar.name,
			timezone: calendar.timezone,
			type: calendar.type,
			active: calendar.active,

			createdBy: getId(calendar.createdBy),
			updatedBy: getId(calendar.updatedBy),

			createdAt: calendar.createdAt,
			updatedAt: calendar.updatedAt,
		};
	}
}

export const calendarPresenter = new CalendarPresenter();

export default calendarPresenter;
