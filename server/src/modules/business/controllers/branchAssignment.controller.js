import validateRequest from "../../../shared/validation/validateRequest.js";
import { success } from "../../../shared/utils/apiResponse.js";

import branchAssignmentService from "../services/branchAssignment.service.js";

import {
	assignBranchMemberRequestSchema,
	businessBranchParamsSchema,
	businessMemberParamsSchema,
	deactivateBranchAssignmentRequestSchema,
	reactivateBranchAssignmentRequestSchema,
	setPrimaryBranchAssignmentRequestSchema,
} from "../validators/index.js";
import { branchAssignmentPresenter } from "../presenters/index.js";

class BranchAssignmentController {
	async assign(req, res, next) {
		try {
			const { params, body } = validateRequest(
				assignBranchMemberRequestSchema,
				req,
			);

			const assignment = await branchAssignmentService.assign(
				params.businessId,
				params.branchId,
				body.businessMemberId,
				{
					actorId: req.user.id,
					requestMetadata: req.requestMetadata,
				},
			);

			return success(
				res,
				branchAssignmentPresenter.present(assignment),
				"Member assigned to branch successfully.",
				201,
			);
		} catch (error) {
			next(error);
		}
	}

	async setPrimary(req, res, next) {
		try {
			const { params } = validateRequest(
				setPrimaryBranchAssignmentRequestSchema,
				req,
			);

			const assignment = await branchAssignmentService.setPrimary(
				params.businessId,
				params.branchId,
				params.memberId,
				{
					actorId: req.user.id,
					requestMetadata: req.requestMetadata,
				},
			);

			return success(
				res,
				branchAssignmentPresenter.present(assignment),
				"Primary branch updated successfully.",
			);
		} catch (error) {
			next(error);
		}
	}

	async listBranchMembers(req, res, next) {
		try {
			const { params } = validateRequest(
				{
					params: businessBranchParamsSchema,
				},
				req,
			);

			const assignments = await branchAssignmentService.listBranchMembers(
				params.businessId,
				params.branchId,
			);

			return success(
				res,
				branchAssignmentPresenter.presentCollection(assignments),
			);
		} catch (error) {
			next(error);
		}
	}

	async listMemberBranches(req, res, next) {
		try {
			const { params } = validateRequest(
				{
					params: businessMemberParamsSchema,
				},
				req,
			);

			const assignments =
				await branchAssignmentService.listMemberBranches(
					params.businessId,
					params.memberId,
				);

			return success(
				res,
				branchAssignmentPresenter.presentCollection(assignments),
			);
		} catch (error) {
			next(error);
		}
	}

	async deactivate(req, res, next) {
		try {
			const { params } = validateRequest(
				deactivateBranchAssignmentRequestSchema,
				req,
			);

			const assignment = await branchAssignmentService.deactivate(
				params.businessId,
				params.branchId,
				params.memberId,
				{
					actorId: req.user.id,
					requestMetadata: req.requestMetadata,
				},
			);

			return success(
				res,
				branchAssignmentPresenter.present(assignment),
				"Branch assignment deactivated successfully.",
			);
		} catch (error) {
			next(error);
		}
	}

	async reactivate(req, res, next) {
		try {
			const { params } = validateRequest(
				reactivateBranchAssignmentRequestSchema,
				req,
			);

			const assignment = await branchAssignmentService.reactivate(
				params.businessId,
				params.branchId,
				params.memberId,
				{
					actorId: req.user.id,
					requestMetadata: req.requestMetadata,
				},
			);

			return success(
				res,
				branchAssignmentPresenter.present(assignment),
				"Branch assignment reactivated successfully.",
			);
		} catch (error) {
			next(error);
		}
	}
}

export default new BranchAssignmentController();
