import {
	validateRequest,
	asyncHandler,
	success,
	businessOfferingParamsSchema,
} from "../../../../../shared/index.js";

import { tagsService } from "../services/index.js";

import { setTagsRequestSchema } from "../validators/index.js";

// import { businessOfferingParamsSchema } from "../../shared/index.js";

const getTags = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessOfferingParamsSchema,
		},
		req,
	);

	const tags = await tagsService.getByOffering(
		params.businessId,
		params.offeringId,
	);

	return success(res, tags, "Offering tags retrieved successfully.");
});

const setTags = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessOfferingParamsSchema,
			body: setTagsRequestSchema,
		},
		req,
	);

	const tags = await tagsService.setTags({
		businessId: params.businessId,
		offeringId: params.offeringId,
		tags: body.tags,
		actor: req.user,
	});

	return success(res, tags, "Offering tags updated successfully.");
});

export default {
	getTags,
	setTags,
};
