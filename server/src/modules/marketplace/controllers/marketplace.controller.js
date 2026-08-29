import {
	validateRequest,
	success,
	asyncHandler,
} from "../../../shared/index.js";

import { marketplaceService } from "../services/index.js";

import { marketplaceOfferingsQuerySchema } from "../validators/index.js";

const listOfferings = asyncHandler(async (req, res) => {
	const { query } = validateRequest(
		{
			query: marketplaceOfferingsQuerySchema,
		},
		req,
	);

	const result = await marketplaceService.listOfferings(query);

	return success(
		res,
		result,
		"Marketplace offerings retrieved successfully.",
	);
});

export default {
	listOfferings,
};
