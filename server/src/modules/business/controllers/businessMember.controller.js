import { businessMemberService } from "../services/index.js";

import {
	changeMemberRoleRequestSchema,
	inviteMemberRequestSchema,
} from "../validators/index.js";

import {
	validateRequest,
	asyncHandler,
	success,
	businessParamsSchema,
	HTTP_STATUS,
	businessMemberParamsSchema,
} from "../../../shared/index.js";

const invite = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessParamsSchema,
			body: inviteMemberRequestSchema,
		},
		req,
	);

	const member = await businessMemberService.invite({
		businessId: params.businessId,
		command: body,
		actorId: req.user.id,
		requestMetadata: req.requestMetadata,
	});

	return success(
		res,
		member,
		"Member invited successfully.",
		HTTP_STATUS.CREATED,
	);
});

const changeRole = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessMemberParamsSchema,
			body: changeMemberRoleRequestSchema,
		},
		req,
	);

	const member = await businessMemberService.changeRole({
		businessId: params.businessId,
		memberId: params.memberId,
		roleId: body.roleId,
		actorId: req.user.id,
		requestMetadata: req.requestMetadata,
	});

	return success(res, member, "Member role updated successfully.");
});

const transferOwnership = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessMemberParamsSchema,
		},
		req,
	);

	const result = await businessMemberService.transferOwnership({
		businessId: params.businessId,
		targetMemberId: params.memberId,
		actorId: req.user.id,
		requestMetadata: req.requestMetadata,
	});

	return success(res, result, "Ownership transferred successfully.");
});

const leave = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessParamsSchema,
		},
		req,
	);

	const result = await businessMemberService.leaveBusiness({
		businessId: params.businessId,
		actorId: req.user.id,
		requestMetadata: req.requestMetadata,
	});

	return success(res, result, "Left business successfully.");
});

const remove = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessMemberParamsSchema,
		},
		req,
	);

	const result = await businessMemberService.remove({
		businessId: params.businessId,
		memberId: params.memberId,
		actorId: req.user.id,
		requestMetadata: req.requestMetadata,
	});

	return success(res, result, "Member removed successfully.");
});

const list = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessParamsSchema,
		},
		req,
	);

	const members = await businessMemberService.list({
		businessId: params.businessId,
	});

	return success(res, members, "Members retrieved successfully.");
});

const deactivate = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessMemberParamsSchema,
		},
		req,
	);

	const member = await businessMemberService.deactivate({
		businessId: params.businessId,
		memberId: params.memberId,
		actorId: req.user.id,
		requestMetadata: req.requestMetadata,
	});

	return success(res, member, "Member deactivated successfully.");
});

const reactivate = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessMemberParamsSchema,
		},
		req,
	);

	const member = await businessMemberService.reactivate({
		businessId: params.businessId,
		memberId: params.memberId,
		actorId: req.user.id,
		requestMetadata: req.requestMetadata,
	});

	return success(res, member, "Member reactivated successfully.");
});

export default {
	invite,
	changeRole,
	transferOwnership,
	leave,
	remove,
	list,
	deactivate,
	reactivate,
};
