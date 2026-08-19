import businessService from "../services/business.service.js";

import {
	createBusinessRequestSchema,
	updateBusinessSchema,
} from "../validators/index.js";
import { validateRequest, success } from "../../../shared/index.js";
import { businessPresenter } from "../presenters/index.js";
import { businessConfigurationPresenter } from "../../businessConfiguration/presenters/index.js";

class BusinessController {
	async create(req, res, next) {
		try {
			const { body } = validateRequest(
				{
					body: createBusinessRequestSchema,
				},
				req,
			);

			const business = await businessService.create(body, {
				actorId: req.user.id,
				requestMetadata: req.requestMetadata,
			});

			return res.status(201).json({
				success: true,
				data: businessPresenter.present(business),
			});
		} catch (error) {
			next(error);
		}
	}

	async update(req, res, next) {
		try {
			const { body } = validateRequest(
				{
					body: updateBusinessSchema,
				},
				req,
			);

			const business = await businessService.updateBusiness(
				req.params.businessId,
				body,
				{
					actorId: req.user.id,
					requestMetadata: req.requestMetadata,
				},
			);

			return success(
				res,
				businessPresenter.present(business),
				"Business updated successfully.",
			);
		} catch (error) {
			next(error);
		}
	}

	async list(req, res, next) {
		try {
			const businesses = await businessService.listBusinesses(
				req.user.id,
			);

			return success(res, businessPresenter.presentMany(businesses));
		} catch (error) {
			next(error);
		}
	}

	async get(req, res, next) {
		try {
			const business = await businessService.getBusiness(
				req.params.businessId,
				req.user.id,
			);

			return success(res, businessPresenter.present(business));
		} catch (error) {
			next(error);
		}
	}

	async configuration(req, res, next) {
		try {
			const configuration = await businessService.getConfiguration(
				req.params.businessId,
				req.user.id,
			);

			return success(
				res,
				businessConfigurationPresenter.present(configuration),
			);
		} catch (error) {
			next(error);
		}
	}
}

export default new BusinessController();
