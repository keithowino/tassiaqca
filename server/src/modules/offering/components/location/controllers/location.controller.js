import {
	asyncHandler,
	success,
	validateRequest,
	businessOfferingParamsSchema,
} from "../../../../../shared/index.js";

import { locationService } from "../services/index.js";
import { setLocationSchema } from "../validators/index.js";

const getLocation = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessOfferingParamsSchema,
		},
		req,
	);

	const location = await locationService.getLocation(
		params.businessId,
		params.offeringId,
	);

	return success(res, location, "Offering location retrieved successfully.");
});

const setLocation = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessOfferingParamsSchema,
			body: setLocationSchema,
		},
		req,
	);

	const location = await locationService.setLocation({
		businessId: params.businessId,
		offeringId: params.offeringId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, location, "Offering location updated successfully.");
});

export default {
	getLocation,
	setLocation,
};
