import asyncHandler from "../../../../../shared/utils/asyncHandler.js";
import { success } from "../../../../../shared/utils/apiResponse.js";
import { validateRequest } from "../../../../../shared/validation/index.js";

import { mediaService } from "../services/index.js";

import { setMediaRequestSchema } from "../validators/index.js";

import { businessOfferingParamsSchema } from "../../shared/validators/params.schema.js";

const getMedia = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessOfferingParamsSchema,
		},
		req,
	);

	const media = await mediaService.getByOffering(params.offeringId);

	return success(res, media, "Offering media retrieved successfully.");
});

const setMedia = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessOfferingParamsSchema,
			body: setMediaRequestSchema,
		},
		req,
	);

	const media = await mediaService.setMedia({
		businessId: params.businessId,
		offeringId: params.offeringId,
		media: body.media,
		actor: req.user,
	});

	return success(res, media, "Offering media updated successfully.");
});

export default {
	getMedia,
	setMedia,
};
