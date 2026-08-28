import {
	validateRequest,
	asyncHandler,
	success,
	businessOfferingParamsSchema,
} from "../../../../../shared/index.js";

import { seoService } from "../services/index.js";

import { setSeoRequestSchema } from "../validators/index.js";

const getSeo = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessOfferingParamsSchema,
		},
		req,
	);

	const seo = await seoService.getByOffering(
		params.businessId,
		params.offeringId,
	);

	return success(res, seo, "Offering SEO retrieved successfully.");
});

const setSeo = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessOfferingParamsSchema,
			body: setSeoRequestSchema,
		},
		req,
	);

	const seo = await seoService.setSeo({
		businessId: params.businessId,
		offeringId: params.offeringId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, seo, "Offering SEO updated successfully.");
});

export default {
	getSeo,
	setSeo,
};
