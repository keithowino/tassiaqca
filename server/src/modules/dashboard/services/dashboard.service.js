import * as businessConfigurationService from "../../businessConfiguration/services/businessConfiguration.service.js";

import { resolveDashboardModules, buildDashboard } from "../builders/index.js";

import { presentDashboard } from "../presenters/index.js";

export const getDashboard = async (businessId) => {
	const configuration =
		await businessConfigurationService.getConfiguration(businessId);

	const modules = resolveDashboardModules(configuration);

	const widgets = buildDashboard(modules);

	return presentDashboard(widgets);
};
