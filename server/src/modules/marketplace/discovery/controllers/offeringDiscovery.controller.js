import {
	validateRequest,
	success,
	asyncHandler,
} from "../../../../shared/index.js";

import { offeringDiscoveryService } from "../services/index.js";
import { offeringDiscoveryQuerySchema } from "../validators/index.js";

const listFeatured = asyncHandler(async (req, res) => {
	const { query } = validateRequest(
		{
			query: offeringDiscoveryQuerySchema,
		},
		req,
	);

	const result = await offeringDiscoveryService.listFeatured(query);

	return success(
		res,
		result,
		"Featured marketplace offerings retrieved successfully.",
	);
});

export default {
	listFeatured,
};
