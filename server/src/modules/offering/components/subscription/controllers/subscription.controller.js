import {
	validateRequest,
	asyncHandler,
	success,
	businessOfferingParamsSchema,
} from "../../../../../shared/index.js";

import { subscriptionService } from "../services/index.js";
import { setSubscriptionSchema } from "../validators/index.js";
// import { businessOfferingParamsSchema } from "../../shared/index.js";

export const setSubscription = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessOfferingParamsSchema,
			body: setSubscriptionSchema,
		},
		req,
	);

	const subscription = await subscriptionService.setSubscription({
		businessId: params.businessId,
		offeringId: params.offeringId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(
		res,
		subscription,
		"Offering subscription updated successfully.",
	);
});

export const getSubscription = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessOfferingParamsSchema,
		},
		req,
	);

	const subscription = await subscriptionService.getSubscription(
		params.businessId,
		params.offeringId,
	);

	return success(
		res,
		subscription,
		"Offering subscription retrieved successfully.",
	);
});

export default {
	setSubscription,
	getSubscription,
};
