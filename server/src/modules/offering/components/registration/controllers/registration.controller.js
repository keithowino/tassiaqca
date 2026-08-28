import {
	asyncHandler,
	success,
	validateRequest,
	businessOfferingParamsSchema,
} from "../../../../../shared/index.js";

import { registrationService } from "../services/index.js";

import { setRegistrationSchema } from "../validators/index.js";

const getRegistration = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessOfferingParamsSchema,
		},
		req,
	);

	const registration = await registrationService.getRegistration(
		params.businessId,
		params.offeringId,
	);

	return success(
		res,
		registration,
		"Offering registration retrieved successfully.",
	);
});

const setRegistration = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessOfferingParamsSchema,
			body: setRegistrationSchema,
		},
		req,
	);

	const registration = await registrationService.setRegistration({
		businessId: params.businessId,
		offeringId: params.offeringId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(
		res,
		registration,
		"Offering registration updated successfully.",
	);
});

export default {
	getRegistration,
	setRegistration,
};
