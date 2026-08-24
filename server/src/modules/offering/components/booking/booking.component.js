import componentContract from "../component.contract.js";

import { bookingService } from "./services/index.js";
import { setBookingSchema } from "./validators/index.js";

const bookingComponent = {
	...componentContract,

	validateCreate(context) {
		if (context.data.booking === undefined) {
			return;
		}

		setBookingSchema.parse(context.data.booking);
	},

	validateUpdate(context) {
		if (context.data.booking === undefined) {
			return;
		}

		setBookingSchema.parse(context.data.booking);
	},

	async afterCreate(context) {
		if (context.data.booking === undefined) {
			return;
		}

		const booking = await bookingService.setBooking({
			businessId: context.businessId,
			offeringId: context.offering.id,
			data: context.data.booking,
			actor: context.actor,
			requestMetadata: context.requestMetadata,
		});

		context.state.booking = booking;
	},

	async afterUpdate(context) {
		if (context.data.booking === undefined) {
			return;
		}

		const booking = await bookingService.setBooking({
			businessId: context.businessId,
			offeringId: context.offering.id,
			data: context.data.booking,
			actor: context.actor,
			requestMetadata: context.requestMetadata,
		});

		context.state.booking = booking;
	},
};

export default bookingComponent;
