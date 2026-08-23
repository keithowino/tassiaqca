import componentContract from "../component.contract.js";

import { calendarService } from "./services/index.js";
import { setCalendarSchema } from "./validators/index.js";

const calendarComponent = {
	...componentContract,

	validateCreate(context) {
		if (context.data.calendar === undefined) {
			return;
		}

		setCalendarSchema.parse(context.data.calendar);
	},

	validateUpdate(context) {
		if (context.data.calendar === undefined) {
			return;
		}

		setCalendarSchema.parse(context.data.calendar);
	},

	async afterCreate(context) {
		if (context.data.calendar === undefined) {
			return;
		}

		const calendar = await calendarService.setCalendar({
			businessId: context.businessId,
			offeringId: context.offering.id,
			data: context.data.calendar,
			actor: context.actor,
			requestMetadata: context.requestMetadata,
		});

		context.state.calendar = calendar;
	},

	async afterUpdate(context) {
		if (context.data.calendar === undefined) {
			return;
		}

		const calendar = await calendarService.setCalendar({
			businessId: context.businessId,
			offeringId: context.offering.id,
			data: context.data.calendar,
			actor: context.actor,
			requestMetadata: context.requestMetadata,
		});

		context.state.calendar = calendar;
	},
};

export default calendarComponent;
