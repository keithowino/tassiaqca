import { navigationService } from "../services/index.js";

import {
	validateRequest,
	asyncHandler,
	success,
	businessParamsSchema,
} from "../../../shared/index.js";

const getNavigation = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessParamsSchema,
		},
		req,
	);

	const navigation = await navigationService.getNavigation({
		businessId: params.businessId,
	});

	return success(res, navigation);
});

export default {
	getNavigation,
};
