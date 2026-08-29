import {
	validateRequest,
	asyncHandler,
	success,
} from "../../../../shared/index.js";

import { businessDiscoveryService } from "../services/index.js";
import { businessDiscoveryQuerySchema } from "../validators/index.js";

const listBusinesses = asyncHandler(async (req, res) => {
	const { query } = validateRequest(
		{
			query: businessDiscoveryQuerySchema,
		},
		req,
	);

	const result = await businessDiscoveryService.listBusinesses(query);

	return success(
		res,
		result,
		"Marketplace businesses retrieved successfully.",
	);
});

export default {
	listBusinesses,
};
