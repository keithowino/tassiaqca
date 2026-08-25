import {
	asyncHandler,
	success,
	validateRequest,
} from "../../../../../shared/index.js";

import { businessOfferingParamsSchema } from "../../shared/index.js";

import { instructorService } from "../services/index.js";

import { setInstructorSchema } from "../validators/index.js";

const getInstructors = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessOfferingParamsSchema,
		},
		req,
	);

	const instructors = await instructorService.getInstructors(
		params.businessId,
		params.offeringId,
	);

	return success(
		res,
		instructors,
		"Offering instructors retrieved successfully.",
	);
});

const setInstructors = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessOfferingParamsSchema,
			body: setInstructorSchema,
		},
		req,
	);

	const instructors = await instructorService.setInstructors({
		businessId: params.businessId,
		offeringId: params.offeringId,
		// instructors: body.instructors,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(
		res,
		instructors,
		"Offering instructors updated successfully.",
	);
});

export default {
	getInstructors,
	setInstructors,
};
