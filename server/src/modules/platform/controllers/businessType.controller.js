import { businessTypeRegistry, success } from "../../../shared/index.js";

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
