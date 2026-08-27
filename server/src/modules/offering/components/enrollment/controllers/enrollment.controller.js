import {
	asyncHandler,
	success,
	validateRequest,
	businessOfferingParamsSchema,
} from "../../../../../shared/index.js";

// import { businessOfferingParamsSchema } from "../../shared/index.js";

import { enrollmentService } from "../services/index.js";
import { setEnrollmentSchema } from "../validators/index.js";

const getEnrollment = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessOfferingParamsSchema,
		},
		req,
	);

	const enrollment = await enrollmentService.getEnrollment(
		params.businessId,
		params.offeringId,
	);

	return success(
		res,
		enrollment,
		"Offering enrollment retrieved successfully.",
	);
});

const setEnrollment = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessOfferingParamsSchema,
			body: setEnrollmentSchema,
		},
		req,
	);

	const enrollment = await enrollmentService.setEnrollment({
		businessId: params.businessId,
		offeringId: params.offeringId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(
		res,
		enrollment,
		"Offering enrollment updated successfully.",
	);
});

export default {
	getEnrollment,
	setEnrollment,
};
