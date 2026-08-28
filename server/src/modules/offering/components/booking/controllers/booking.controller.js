import {
	asyncHandler,
	success,
	validateRequest,
	businessOfferingParamsSchema,
} from "../../../../../shared/index.js";

import { bookingService } from "../services/index.js";
import { setBookingSchema } from "../validators/index.js";

const getBooking = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessOfferingParamsSchema,
		},
		req,
	);

	const booking = await bookingService.getBooking(
		params.businessId,
		params.offeringId,
	);

	return success(res, booking, "Offering booking retrieved successfully.");
});

const setBooking = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessOfferingParamsSchema,
			body: setBookingSchema,
		},
		req,
	);

	const booking = await bookingService.setBooking({
		businessId: params.businessId,
		offeringId: params.offeringId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, booking, "Offering booking updated successfully.");
});

export default {
	getBooking,
	setBooking,
};
