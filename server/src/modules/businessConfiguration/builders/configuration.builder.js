import { businessTypeRegistry } from "../../../shared/platform/businessTypes/index.js";
import { moduleRegistry } from "../../../shared/platform/modules/index.js";
import { capabilityRegistry } from "../../../shared/platform/capabilities/index.js";
import { UnknownBusinessTypeError } from "../errors/index.js";

export const buildConfiguration = (businessTypeId) => {
	const businessType = businessTypeRegistry.get(businessTypeId);

	if (!businessType) {
		throw new UnknownBusinessTypeError(businessTypeId);
	}

	const moduleStates = [];
	const capabilityStates = [];
	const capabilityIds = new Set();

	for (const moduleId of businessType.modules) {
		const module = moduleRegistry.get(moduleId);

		moduleStates.push({
			id: module.id,
			enabled: true,
			settings: {},
		});

		for (const capabilityId of module.capabilities) {
			if (capabilityIds.has(capabilityId)) {
				continue;
			}

			const capability = capabilityRegistry.get(capabilityId);

			capabilityStates.push({
				id: capability.id,
				enabled: true,
				settings: {},
			});

			capabilityIds.add(capability.id);
		}
	}

	return {
		businessType: businessType.id,

		modules: moduleStates,

		capabilities: capabilityStates,

		featureFlags: {},

		metadata: {},
	};
};
