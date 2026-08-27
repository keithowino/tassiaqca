import { businessConfigurationRepository } from "../repositories/index.js";

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

const businessProvisioningService = new BusinessProvisioningService();

export default businessProvisioningService;
