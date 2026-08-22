import {
	validateRequest,
	asyncHandler,
	success,
} from "../../../../../shared/index.js";

import { pricingService } from "../services/index.js";

import { setCurrentPricingSchema } from "../validators/index.js";

import { businessOfferingParamsSchema } from "../../shared/index.js";

/**
 * Pricing did need independent API operations, but as domain operations rather than CRUD endpoints.
 */

const getCurrentPricing = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessOfferingParamsSchema,
		},
		req,
	);

	const pricing = await pricingService.getCurrent(
		params.businessId,
		params.offeringId,
	);

	return success(
		res,
		pricing,
		"Current offering price retrieved successfully.",
	);
});

const setCurrentPricing = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessOfferingParamsSchema,
			body: setCurrentPricingSchema,
		},
		req,
	);

	const pricing = await pricingService.setCurrentPrice({
		businessId: params.businessId,
		offeringId: params.offeringId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, pricing, "Offering price updated successfully.");
});

const getPricingHistory = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessOfferingParamsSchema,
		},
		req,
	);

	const history = await pricingService.getHistory(
		params.businessId,
		params.offeringId,
	);

	return success(
		res,
		history,
		"Offering pricing history retrieved successfully.",
	);
});

export default {
	getCurrentPricing,
	setCurrentPricing,
	getPricingHistory,
};
