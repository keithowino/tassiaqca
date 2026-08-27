import {
	validateRequest,
	asyncHandler,
	success,
	businessParamsSchema,
} from "../../../shared/index.js";

import { businessDashboardService } from "../services/index.js";

const getDashboard = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessParamsSchema,
		},
		req,
	);

	const dashboard = await businessDashboardService.getDashboard({
		businessId: params.businessId,
	});

	return success(res, dashboard);
});

export default {
	getDashboard,
};
