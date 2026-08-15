import asyncHandler from "../../../../../shared/utils/asyncHandler.js";
import { success } from "../../../../../shared/utils/apiResponse.js";
import { validateRequest } from "../../../../../shared/validation/index.js";

import { attributesService } from "../services/index.js";

import { setAttributesRequestSchema } from "../validators/index.js";
import { businessOfferingParamsSchema } from "../../shared/validators/params.schema.js";

const getAttributes = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessOfferingParamsSchema,
		},
		req,
	);

	const attributes = await attributesService.getByOffering(
		params.businessId,
		params.offeringId,
	);

	return success(
		res,
		attributes,
		"Offering attributes retrieved successfully.",
	);
});

const setAttributes = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessOfferingParamsSchema,
			body: setAttributesRequestSchema,
		},
		req,
	);

	const attributes = await attributesService.setAttributes({
		businessId: params.businessId,
		offeringId: params.offeringId,
		attributes: body.attributes,
		actor: req.user,
	});

	return success(
		res,
		attributes,
		"Offering attributes updated successfully.",
	);
});

export default {
	getAttributes,
	setAttributes,
};
