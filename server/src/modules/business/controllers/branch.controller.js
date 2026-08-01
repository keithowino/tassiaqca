import validateRequest from "../../../shared/validation/validateRequest.js";

import { success } from "../../../shared/utils/apiResponse.js";

import branchService from "../services/branch.service.js";
import { branchPresenter } from "../presenters/index.js";

import {
	businessParamsSchema,
	createBranchRequestSchema,
	deactivateBranchRequestSchema,
	reactivateBranchRequestSchema,
	updateBranchRequestSchema,
} from "../validators/index.js";

class BranchController {
	async create(req, res, next) {
		try {
			const { params, body } = validateRequest(
				createBranchRequestSchema,
				req,
			);

			const branch = await branchService.create(params.businessId, body, {
				actorId: req.user.id,
				requestMetadata: req.requestMetadata,
			});

			return success(
				res,
				branchPresenter.present(branch),
				"Branch created successfully.",
				201,
			);
		} catch (error) {
			next(error);
		}
	}

	async update(req, res, next) {
		try {
			const { params, body } = validateRequest(
				updateBranchRequestSchema,
				req,
			);

			const branch = await branchService.update(
				params.businessId,
				params.branchId,
				body,
				{
					actorId: req.user.id,
					requestMetadata: req.requestMetadata,
				},
			);

			return success(
				res,
				branchPresenter.present(branch),
				"Branch updated successfully.",
			);
		} catch (error) {
			next(error);
		}
	}

	async deactivate(req, res, next) {
		try {
			const { params } = validateRequest(
				deactivateBranchRequestSchema,
				req,
			);

			const branch = await branchService.deactivate(
				params.businessId,
				params.branchId,
				{
					actorId: req.user.id,
					requestMetadata: req.requestMetadata,
				},
			);

			return success(
				res,
				branchPresenter.present(branch),
				"Branch deactivated successfully.",
			);
		} catch (error) {
			next(error);
		}
	}

	async reactivate(req, res, next) {
		try {
			const { params } = validateRequest(
				reactivateBranchRequestSchema,
				req,
			);

			const branch = await branchService.reactivate(
				params.businessId,
				params.branchId,
				{
					actorId: req.user.id,
					requestMetadata: req.requestMetadata,
				},
			);

			return success(
				res,
				branchPresenter.present(branch),
				"Branch reactivated successfully.",
			);
		} catch (error) {
			next(error);
		}
	}

	async list(req, res, next) {
		try {
			const { params } = validateRequest(
				{
					params: businessParamsSchema,
				},
				req,
			);

			const branches = await branchService.list(params.businessId);

			return success(res, branchPresenter.presentCollection(branches));
		} catch (error) {
			next(error);
		}
	}
}

export default new BranchController();
