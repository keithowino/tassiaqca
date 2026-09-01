import {
	validateRequest,
	asyncHandler,
	success,
} from "../../../../../shared/index.js";

import { offeringProfileParamsSchema } from "../validators/index.js";
import { offeringProfileService } from "../services/index.js";

const getOfferingProfile = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: offeringProfileParamsSchema,
		},
		req,
	);

	const result = await offeringProfileService.getBySlug(params.slug);

	return success(
		res,
		result,
		"Marketplace offering profile retrieved successfully.",
	);
});

export default {
	getOfferingProfile,
};
