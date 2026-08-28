import { businessService } from "../../modules/business/index.js";
import { offeringRepository } from "../../modules/offering/index.js";

import { AppError, ErrorCodes } from "../errors/index.js";
import { HTTP_STATUS } from "../constants/index.js";

/*
|--------------------------------------------------------------------------
| Universal Helpers
|--------------------------------------------------------------------------
*/

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
