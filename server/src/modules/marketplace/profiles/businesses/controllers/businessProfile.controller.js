import {
	asyncHandler,
	AppError,
	ErrorCodes,
	HTTP_STATUS,
	success,
} from "../../../../../shared/index.js";

import { businessProfileService } from "../services/index.js";

/**
 * #### Validator
 *
 * - For this first profile endpoint, there is no query payload to validate. The route parameter is constrained by the route itself and the service lookup.
 * - Therefore we do not need a validator yet.
 * - That is intentional. We should not create a validator merely to satisfy the folder structure.
 * - The architecture requires validators where request validation is necessary; it does not require every endpoint to have a schema.
 */
const getBusinessProfile = asyncHandler(async (req, res) => {
	const { slug } = req.params;

	const profile = await businessProfileService.getBySlug(slug);

	if (!profile) {
		throw new AppError(
			"Marketplace business profile not found.",
			HTTP_STATUS.NOT_FOUND,
			ErrorCodes.NOT_FOUND,
		);
	}

	return success(
		res,
		profile,
		"Marketplace business profile retrieved successfully.",
	);
});

export default {
	getBusinessProfile,
};
