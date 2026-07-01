import businessService from "../services/business.service.js";

import validateRequest from "../../../shared/validation/validateRequest.js";

import createBusinessRequestSchema from "../validators/createBusiness.validator.js";
import updateBusinessSchema from "../validators/updateBusiness.validator.js";
import { success } from "../../../shared/utils/apiResponse.js";

class BusinessController {
	async create(req, res, next) {
		try {
			const { body } = validateRequest(
				{
					body: createBusinessRequestSchema,
				},
				req,
			);

			const business = await businessService.create(body, req.user._id);

			return res.status(201).json({
				success: true,
				data: business,
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
			);

			return success(res, business, "Business updated successfully.");
		} catch (error) {
			next(error);
		}
	}
}

export default new BusinessController();
