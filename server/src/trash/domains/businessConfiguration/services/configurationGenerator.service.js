import { buildConfiguration } from "../builders/index.js";

export const generateConfiguration = ({
	businessId,
	businessType,
	createdBy,
}) => {
	const configuration = buildConfiguration(businessType);

	return {
		business: businessId,

		businessType: configuration.businessType,

		modules: configuration.modules,

		capabilities: configuration.capabilities,

		featureFlags: configuration.featureFlags,

		metadata: configuration.metadata,

		createdBy,

		updatedBy: createdBy,
	};
};
