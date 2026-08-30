import {
	validateRequest,
	asyncHandler,
	success,
} from "../../../../shared/index.js";

import { trendingOfferingsQuerySchema } from "../validators/index.js";

import { trendingOfferingService } from "../services/index.js";

import { marketplaceOfferingPresenter } from "../../presenters/index.js";

const listTrending = asyncHandler(async (req, res) => {
	const { query } = validateRequest(
		{
			query: trendingOfferingsQuerySchema,
		},
		req,
	);

	const result = await trendingOfferingService.list(query);

	// return success(
	// 	res,
	// 	{
	// 		data: marketplaceOfferingPresenter.presentCollection(
	// 			result.offerings,
	// 		),
	// 		pagination: {
	// 			total: result.total,
	// 			page: result.page,
	// 			limit: result.limit,
	// 			totalPages: result.totalPages,
	// 		},
	// 	},
	// 	"Trending marketplace offerings retrieved successfully.",
	// );
	return success(
		res,
		result,
		"Trending marketplace offerings retrieved successfully.",
	);
});

export default {
	listTrending,
};
