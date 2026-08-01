import * as repository from "../repositories/businessConfiguration.repository.js";

import { generateConfiguration } from "./configurationGenerator.service.js";

import {
	BusinessConfigurationAlreadyExistsError,
	BusinessConfigurationNotFoundError,
} from "../errors/index.js";

export const provisionConfiguration = async ({
	businessId,
	businessType,
	createdBy,
	session,
}) => {
	const exists = await repository.existsForBusiness(businessId);

	if (exists) {
		throw new BusinessConfigurationAlreadyExistsError(businessId);
	}

	const payload = generateConfiguration({
		businessId,
		businessType,
		createdBy,
	});

	return repository.create(payload, { session });
};

export const getConfiguration = async (businessId) => {
	const configuration = await repository.findByBusiness(businessId);

	if (!configuration) {
		throw new BusinessConfigurationNotFoundError(businessId);
	}

	return configuration;
};

export const regenerateConfiguration = async ({
	businessId,
	businessType,
	updatedBy,
	session,
}) => {
	const payload = generateConfiguration({
		businessId,
		businessType,
		createdBy: updatedBy,
	});

	payload.updatedBy = updatedBy;

	return repository.replace(businessId, payload, { session });
};

export const updateConfiguration = (businessId, updates, options = {}) =>
	repository.update(businessId, updates, options);
