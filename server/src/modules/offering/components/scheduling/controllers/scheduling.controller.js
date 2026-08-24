import {
	asyncHandler,
	success,
	validateRequest,
} from "../../../../../shared/index.js";

import { businessOfferingParamsSchema } from "../../shared/index.js";

import { schedulingService } from "../services/index.js";
import { setSchedulingSchema } from "../validators/index.js";

const getScheduling = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessOfferingParamsSchema,
		},
		req,
	);

	const scheduling = await schedulingService.getScheduling(
		params.businessId,
		params.offeringId,
	);

	return success(
		res,
		scheduling,
		"Offering scheduling retrieved successfully.",
	);
});

const setScheduling = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessOfferingParamsSchema,
			body: setSchedulingSchema,
		},
		req,
	);

	const scheduling = await schedulingService.setScheduling({
		businessId: params.businessId,
		offeringId: params.offeringId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(
		res,
		scheduling,
		"Offering scheduling updated successfully.",
	);
});

export default {
	getScheduling,
	setScheduling,
};
