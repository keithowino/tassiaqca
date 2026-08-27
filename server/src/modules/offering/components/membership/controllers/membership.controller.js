import {
	asyncHandler,
	success,
	validateRequest,
	businessOfferingParamsSchema,
} from "../../../../../shared/index.js";

// import { businessOfferingParamsSchema } from "../../shared/index.js";

import { membershipService } from "../services/index.js";

import { setMembershipSchema } from "../validators/index.js";

const getMembership = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessOfferingParamsSchema,
		},
		req,
	);

	const membership = await membershipService.getMembership(
		params.businessId,
		params.offeringId,
	);

	return success(
		res,
		membership,
		"Offering membership retrieved successfully.",
	);
});

const setMembership = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessOfferingParamsSchema,
			body: setMembershipSchema,
		},
		req,
	);

	const membership = await membershipService.setMembership({
		businessId: params.businessId,
		offeringId: params.offeringId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(
		res,
		membership,
		"Offering membership updated successfully.",
	);
});

export default {
	getMembership,
	setMembership,
};
