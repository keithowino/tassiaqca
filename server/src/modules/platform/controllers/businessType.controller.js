import { businessTypeRegistry } from "../../../shared/platform/businessTypes/index.js";

import { success } from "../../../shared/utils/apiResponse.js";

import { businessTypePresenter } from "../presenters/index.js";

class BusinessTypeController {
	async list(req, res, next) {
		try {
			const businessTypes = businessTypeRegistry.getAll();

			return success(
				res,
				businessTypePresenter.presentMany(businessTypes),
			);
		} catch (error) {
			next(error);
		}
	}
}

export default new BusinessTypeController();
