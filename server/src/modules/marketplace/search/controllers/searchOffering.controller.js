import {
	validateRequest,
	asyncHandler,
	success,
} from "../../../../shared/index.js";

import { searchOfferingsQuerySchema } from "../validators/index.js";
import { searchOfferingService } from "../services/index.js";

const searchOfferings = asyncHandler(async (req, res) => {
	const { query } = validateRequest(
		{
			query: searchOfferingsQuerySchema,
		},
		req,
	);

	const result = await searchOfferingService.search(query);

	return success(
		res,
		result,
		"Marketplace offerings search completed successfully.",
	);
});

export default {
	searchOfferings,
};
