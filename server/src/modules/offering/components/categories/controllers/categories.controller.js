import {
	validateRequest,
	asyncHandler,
	success,
} from "../../../../../shared/index.js";

import { categoriesService } from "../services/index.js";

import { setCategoriesRequestSchema } from "../validators/index.js";

import { businessOfferingParamsSchema } from "../../shared/index.js";

const getCategories = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessOfferingParamsSchema,
		},
		req,
	);

	const categories = await categoriesService.getByOffering(
		params.businessId,
		params.offeringId,
	);

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
		requestMetadata: req.requestMetadata,
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
