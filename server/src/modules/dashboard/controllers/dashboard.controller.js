import * as dashboardService from "../services/dashboard.service.js";

import { success } from "../../../shared/utils/apiResponse.js";

export const getDashboard = async (req, res) => {
	const dashboard = await dashboardService.getDashboard(
		req.params.businessId,
	);

	return success(res, dashboard);
};
