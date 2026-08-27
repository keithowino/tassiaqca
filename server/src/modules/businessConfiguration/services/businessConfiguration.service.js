import { businessConfigurationRepository } from "../repositories/index.js";

import { generateConfiguration } from "./configurationGenerator.service.js";

import {
	BusinessConfigurationAlreadyExistsError,
	BusinessConfigurationNotFoundError,
} from "../errors/index.js";

// export const provisionConfiguration = async ({
// 	businessId,
// 	businessType,
// 	createdBy,
// 	session,
// }) => {
// 	const exists = await repository.existsForBusiness(businessId);

// 	if (exists) {
// 		throw new BusinessConfigurationAlreadyExistsError(businessId);
// 	}

// 	const payload = generateConfiguration({
// 		businessId,
// 		businessType,
// 		createdBy,
// 	});

// 	return repository.create(payload, { session });
// };

// export const getConfiguration = async (businessId) => {
// 	const configuration = await repository.findByBusiness(businessId);

// 	if (!configuration) {
// 		throw new BusinessConfigurationNotFoundError(businessId);
// 	}

// 	return configuration;
// };

// export const regenerateConfiguration = async ({
// 	businessId,
// 	businessType,
// 	updatedBy,
// 	session,
// }) => {
// 	const payload = generateConfiguration({
// 		businessId,
// 		businessType,
// 		createdBy: updatedBy,
// 	});

// 	payload.updatedBy = updatedBy;

// 	return repository.replace(businessId, payload, { session });
// };

// export const updateConfiguration = (businessId, updates, options = {}) =>
// 	repository.update(businessId, updates, options);

class BusinessConfigurationService {
	async provisionConfiguration({
		businessId,
		businessType,
		createdBy,
		session,
	}) {
		const exists =
			await businessConfigurationRepository.existsForBusiness(businessId);

		if (exists) {
			throw new BusinessConfigurationAlreadyExistsError(businessId);
		}

		const payload = generateConfiguration({
			businessId,
			businessType,
			createdBy,
		});

		return repository.create(payload, { session });
	}

	async getConfiguration(businessId) {
		const configuration =
			await businessConfigurationRepository.findByBusiness(businessId);

		if (!configuration) {
			throw new BusinessConfigurationNotFoundError(businessId);
		}

		return configuration;
	}

	async regenerateConfiguration({
		businessId,
		businessType,
		updatedBy,
		session,
	}) {
		const payload = generateConfiguration({
			businessId,
			businessType,
			createdBy: updatedBy,
		});

		payload.updatedBy = updatedBy;

		return businessConfigurationRepository.replace(businessId, payload, {
			session,
		});
	}

	updateConfiguration(businessId, updates, options = {}) {
		return businessConfigurationRepository.update(
			businessId,
			updates,
			options,
		);
	}
}

const businessConfigurationService = new BusinessConfigurationService();

export default businessConfigurationService;
