import { businessConfigurationService } from "../../businessConfiguration/index.js";

import {
	resolveNavigationModules,
	buildNavigationModel,
} from "../builders/index.js";

import { presentNavigation } from "../presenters/index.js";

class NavigationService {
	async getNavigation({ businessId }) {
		const configuration =
			await businessConfigurationService.getConfiguration(businessId);

		const modules = resolveNavigationModules(configuration);

		const navigation = buildNavigationModel(modules);

		return presentNavigation(navigation);
	}
}

export default new NavigationService();
