import {
	validateRequest,
	asyncHandler,
	success,
} from "../../../../shared/index.js";

import { searchService } from "../services/index.js";
import {
	businessSearchQuerySchema,
	searchOfferingsQuerySchema,
} from "../validators/index.js";

const searchOfferings = asyncHandler(async (req, res) => {
	const { query } = validateRequest(
		{
			query: searchOfferingsQuerySchema,
		},
		req,
	);

	const result = await searchService.searchOffering(query);

	return success(
		res,
		result,
		"Marketplace offerings search completed successfully.",
	);
});

const searchBusinesses = asyncHandler(async (req, res) => {
	const { query } = validateRequest(
		{
			query: businessSearchQuerySchema,
		},
		req,
	);

	const result = await searchService.searchBusiness(query);

	return success(
		res,
		result,
		"Marketplace business search completed successfully.",
	);
});

export default {
	searchOfferings,
	searchBusinesses,
};
