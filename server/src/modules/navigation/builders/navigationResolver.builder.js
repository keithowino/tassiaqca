import { moduleRegistry } from "../../../shared/index.js";

export const resolveNavigationModules = (configuration) => {
	return configuration.modules
		.filter((module) => module.enabled)
		.map((module) => moduleRegistry.get(module.id))
		.filter(Boolean);
};
