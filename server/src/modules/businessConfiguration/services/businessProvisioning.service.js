import * as businessConfigurationRepository from "../repositories/businessConfiguration.repository.js";

import * as configurationGeneratorService from "./configurationGenerator.service.js";

class BusinessProvisioningService {
	async provisionBusiness({ business, actorId }, options = {}) {
		const configuration =
			configurationGeneratorService.generateConfiguration({
				businessId: business._id,
				businessType: business.businessType,
				createdBy: actorId,
			});

		return businessConfigurationRepository.create(configuration, options);
	}
}

export default new BusinessProvisioningService();
