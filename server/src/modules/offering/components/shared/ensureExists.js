import businessService from "../../../business/services/business.service.js";
import { offeringRepository } from "../../repositories/index.js";

import { HTTP_STATUS } from "../../../../shared/constants/index.js";
import { AppError, ErrorCodes } from "../../../../shared/errors/index.js";

export const ensureBusinessExists = async (businessId) => {
	return businessService.ensureExists(businessId);
};

export const ensureOfferingExists = async (businessId, offeringId) => {
	const offering = await offeringRepository.findByBusinessAndId(
		businessId,
		offeringId,
	);

	if (!offering) {
		throw new AppError(
			"Offering not found.",
			HTTP_STATUS.NOT_FOUND,
			ErrorCodes.NOT_FOUND,
		);
	}

	return offering;
};
