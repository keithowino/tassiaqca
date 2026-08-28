import { businessConfigurationService } from "../../businessConfiguration/index.js";

import { resolveDashboardModules, buildDashboard } from "../builders/index.js";

import { presentDashboard } from "../presenters/index.js";

class BusinessDashboardService {
	async getDashboard({ businessId }) {
		const configuration =
			await businessConfigurationService.getConfiguration(businessId);

		const modules = resolveDashboardModules(configuration);

		const widgets = buildDashboard(modules);

		return presentDashboard(widgets);
	}
}

export const businessDashboardService = new BusinessDashboardService();

export default businessDashboardService;
