import {
	asyncHandler,
	success,
	validateRequest,
} from "../../../../../shared/index.js";

import { businessOfferingParamsSchema } from "../../shared/index.js";

import { calendarService } from "../services/index.js";
import { setCalendarSchema } from "../validators/index.js";

const getCalendar = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessOfferingParamsSchema,
		},
		req,
	);

	const calendar = await calendarService.getCalendar(
		params.businessId,
		params.offeringId,
	);

	return success(res, calendar, "Offering calendar retrieved successfully.");
});

const setCalendar = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessOfferingParamsSchema,
			body: setCalendarSchema,
		},
		req,
	);

	const calendar = await calendarService.setCalendar({
		businessId: params.businessId,
		offeringId: params.offeringId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, calendar, "Offering calendar updated successfully.");
});

export default {
	getCalendar,
	setCalendar,
};
