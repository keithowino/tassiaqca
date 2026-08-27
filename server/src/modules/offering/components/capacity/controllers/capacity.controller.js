import {
	asyncHandler,
	success,
	validateRequest,
	businessOfferingParamsSchema,
} from "../../../../../shared/index.js";

// import { businessOfferingParamsSchema } from "../../shared/index.js";

import { capacityService } from "../services/index.js";
import { setCapacitySchema } from "../validators/index.js";

const getCapacity = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessOfferingParamsSchema,
		},
		req,
	);

	const capacity = await capacityService.getCapacity(
		params.businessId,
		params.offeringId,
	);

	return success(res, capacity, "Offering capacity retrieved successfully.");
});

const setCapacity = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessOfferingParamsSchema,
			body: setCapacitySchema,
		},
		req,
	);

	const capacity = await capacityService.setCapacity({
		businessId: params.businessId,
		offeringId: params.offeringId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, capacity, "Offering capacity updated successfully.");
});

export default {
	getCapacity,
	setCapacity,
};
