import * as navigationService from "../services/navigation.service.js";

import { success } from "../../../shared/utils/apiResponse.js";

export const getNavigation = async (req, res) => {
	const navigation = await navigationService.getNavigation(
		req.params.businessId,
	);

	return success(res, navigation);
};
