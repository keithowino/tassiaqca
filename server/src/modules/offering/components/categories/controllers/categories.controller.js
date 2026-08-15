import asyncHandler from "../../../../../shared/utils/asyncHandler.js";
import { success } from "../../../../../shared/utils/apiResponse.js";
import { validateRequest } from "../../../../../shared/validation/index.js";

import { categoriesService } from "../services/index.js";

import { setCategoriesRequestSchema } from "../validators/index.js";

import { businessOfferingParamsSchema } from "../../shared/validators/params.schema.js";

const getCategories = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessOfferingParamsSchema,
		},
		req,
	);

	const categories = await categoriesService.getByOffering(params.offeringId);

	return success(
		res,
		categories,
		"Offering categories retrieved successfully.",
	);
});

const setCategories = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessOfferingParamsSchema,
			body: setCategoriesRequestSchema,
		},
		req,
	);

	const categories = await categoriesService.setCategories({
		businessId: params.businessId,
		offeringId: params.offeringId,
		categoryIds: body.categoryIds,
		actor: req.user,
	});

	return success(
		res,
		categories,
		"Offering categories updated successfully.",
	);
});

export default {
	getCategories,
	setCategories,
};
