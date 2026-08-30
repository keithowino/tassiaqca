import {
	validateRequest,
	asyncHandler,
	success,
} from "../../../../shared/index.js";

import { trendingOfferingsQuerySchema } from "../validators/index.js";

import { trendingOfferingService } from "../services/index.js";

const listTrending = asyncHandler(async (req, res) => {
	const { query } = validateRequest(
		{
			query: trendingOfferingsQuerySchema,
		},
		req,
	);

	const result = await trendingOfferingService.list(query);

	return success(
		res,
		result,
		"Trending marketplace offerings retrieved successfully.",
	);
});

export default {
	listTrending,
};
