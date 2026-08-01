import { moduleRegistry } from "../../../shared/platform/modules/index.js";

export const resolveDashboardModules = (configuration) =>
	configuration.modules
		.filter((module) => module.enabled)
		.map((module) => moduleRegistry.get(module.id))
		.filter(Boolean);
