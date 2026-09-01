import {
	validateRequest,
	asyncHandler,
	success,
} from "../../../../shared/index.js";

import { categoryQuerySchema } from "../validators/index.js";

import { marketplaceCategoryService } from "../services/index.js";

const listCategories = asyncHandler(async (req, res) => {
	const { query } = validateRequest(
		{
			query: categoryQuerySchema,
		},
		req,
	);

	const result = await marketplaceCategoryService.list(query);

	return success(
		res,
		result,
		"Marketplace categories retrieved successfully.",
	);
});

export default {
	listCategories,
};
