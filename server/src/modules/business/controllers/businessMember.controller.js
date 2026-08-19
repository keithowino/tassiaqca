import businessMemberService from "../services/businessMember.service.js";

import {
	changeMemberRoleRequestSchema,
	deactivateMemberRequestSchema,
	inviteMemberRequestSchema,
	leaveBusinessRequestSchema,
	reactivateMemberRequestSchema,
	removeMemberRequestSchema,
	transferOwnershipRequestSchema,
} from "../validators/index.js";

import {
	validateRequest,
	success,
	HTTP_STATUS,
} from "../../../shared/index.js";
import { businessMemberPresenter } from "../presenters/index.js";

class BusinessMemberController {
	async invite(req, res, next) {
		try {
			const { body } = validateRequest(
				{
					body: inviteMemberRequestSchema,
				},
				req,
			);

			const member = await businessMemberService.invite(
				req.params.businessId,
				{
					...body,
					actorId: req.user._id,
				},
				{
					actorId: req.user.id,
					requestMetadata: req.requestMetadata,
				},
			);

			return success(
				res,
				businessMemberPresenter.present(member),
				"Member invited successfully.",
				HTTP_STATUS.CREATED,
			);
		} catch (error) {
			next(error);
		}
	}

	async changeRole(req, res, next) {
		try {
			const { params, body } = validateRequest(
				changeMemberRoleRequestSchema,
				req,
			);

			const member = await businessMemberService.changeRole(
				{
					businessId: params.businessId,
					memberId: params.memberId,
					roleId: body.roleId,
				},
				{
					actorId: req.user.id,
					requestMetadata: req.requestMetadata,
				},
			);

			return success(
				res,
				businessMemberPresenter.present(member),
				"Member role updated successfully.",
			);
		} catch (error) {
			next(error);
		}
	}

	async transferOwnership(req, res, next) {
		try {
			const { params } = validateRequest(
				transferOwnershipRequestSchema,
				req,
			);

			const result = await businessMemberService.transferOwnership(
				{
					businessId: params.businessId,
					targetMemberId: params.memberId,
				},
				{
					actorId: req.user.id,
					requestMetadata: req.requestMetadata,
				},
			);

			return success(res, result, "Ownership transferred successfully.");
		} catch (error) {
			next(error);
		}
	}

	async leave(req, res, next) {
		try {
			const { params } = validateRequest(leaveBusinessRequestSchema, req);

			const result = await businessMemberService.leaveBusiness(
				{
					businessId: params.businessId,
				},
				{
					actorId: req.user.id,
					requestMetadata: req.requestMetadata,
				},
			);

			return success(res, result, "Left business successfully.");
		} catch (error) {
			next(error);
		}
	}

	async remove(req, res, next) {
		try {
			const { params } = validateRequest(removeMemberRequestSchema, req);

			const result = await businessMemberService.remove(
				{
					businessId: req.params.businessId,
					memberId: req.params.memberId,
				},
				{
					actorId: req.user.id,
					requestMetadata: req.requestMetadata,
				},
			);

			return success(res, result, "Member removed successfully.");
		} catch (error) {
			next(error);
		}
	}

	async list(req, res, next) {
		try {
			const members = await businessMemberService.list(
				req.params.businessId,
			);

			return success(
				res,
				businessMemberPresenter.presentMany(members),
				"Members retrieved successfully.",
			);
		} catch (error) {
			next(error);
		}
	}

	async deactivate(req, res, next) {
		try {
			const { params } = validateRequest(
				deactivateMemberRequestSchema,
				req,
			);

			const member = await businessMemberService.deactivate(
				{
					businessId: params.businessId,
					memberId: params.memberId,
				},
				{
					actorId: req.user.id,
					requestMetadata: req.requestMetadata,
				},
			);

			return success(
				res,
				businessMemberPresenter.present(member),
				"Member deactivated successfully.",
			);
		} catch (error) {
			next(error);
		}
	}

	async reactivate(req, res, next) {
		try {
			const { params } = validateRequest(
				reactivateMemberRequestSchema,
				req,
			);

			const member = await businessMemberService.reactivate(
				{
					businessId: params.businessId,
					memberId: params.memberId,
				},
				{
					actorId: req.user.id,
					requestMetadata: req.requestMetadata,
				},
			);

			return success(
				res,
				businessMemberPresenter.present(member),
				"Member reactivated successfully.",
			);
		} catch (error) {
			next(error);
		}
	}
}

export default new BusinessMemberController();
