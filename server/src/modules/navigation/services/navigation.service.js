import * as businessConfigurationService from "../../businessConfiguration/services/businessConfiguration.service.js";

import {
	resolveNavigationModules,
	buildNavigationModel,
} from "../builders/index.js";

import { presentNavigation } from "../presenters/index.js";

export const getNavigation = async (businessId) => {
	const configuration =
		await businessConfigurationService.getConfiguration(businessId);

	const modules = resolveNavigationModules(configuration);

	const navigation = buildNavigationModel(modules);

	return presentNavigation(navigation);
};
