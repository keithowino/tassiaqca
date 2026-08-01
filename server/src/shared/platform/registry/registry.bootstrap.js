import { capabilityRegistry } from "../capabilities/index.js";
import { moduleRegistry } from "../modules/index.js";
import { businessTypeRegistry } from "../businessTypes/index.js";

import { validateReferences } from "./registry.validator.js";

/**
 * Import and leave it unused for now.
 * Very soon, once Product begins declaring required modules, for example:
 * {
 * 	type: PRODUCT,
 *
 * 	modules: [
 *  	MODULES.COMMERCE,
 *  	MODULES.INVENTORY,
 * 	],
 * }
 *
 * then bootstrap would gain another validation:
 *
 * validateReferences({
 * 		sourceRegistry: offeringRegistry,
 * 		targetRegistry: moduleRegistry,
 * 		sourceName: "Offering",
 * 		targetName: "Module",
 * 		selector: (offering) => offering.modules,
 * });
 */
import { offeringRegistry } from "../offerings/index.js";

export const bootstrapPlatformRegistries = () => {
	validateReferences({
		sourceRegistry: moduleRegistry,
		targetRegistry: capabilityRegistry,
		sourceName: "Module",
		targetName: "Capability",
		selector: (module) => module.capabilities,
	});

	validateReferences({
		sourceRegistry: businessTypeRegistry,
		targetRegistry: moduleRegistry,
		sourceName: "Business Type",
		targetName: "Module",
		selector: (businessType) => businessType.modules,
	});
};
