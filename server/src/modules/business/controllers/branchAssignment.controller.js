import {
	validateRequest,
	asyncHandler,
	success,
	businessBranchParamsSchema,
	branchAssignmentParamsSchema,
	businessMemberParamsSchema,
} from "../../../shared/index.js";

import { branchAssignmentService } from "../services/index.js";

import { assignBranchMemberRequestSchema } from "../validators/index.js";

const assign = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		assignBranchMemberRequestSchema,
		req,
	);

	const assignment = await branchAssignmentService.assign({
		businessId: params.businessId,
		branchId: params.branchId,
		businessMemberId: body.businessMemberId,
		actorId: req.user.id,
		requestMetadata: req.requestMetadata,
	});

	return success(
		res,
		assignment,
		"Member assigned to branch successfully.",
		201,
	);
});

const setPrimary = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: branchAssignmentParamsSchema,
		},
		req,
	);

	const assignment = await branchAssignmentService.setPrimary({
		businessId: params.businessId,
		branchId: params.branchId,
		memberId: params.memberId,
		actorId: req.user.id,
		requestMetadata: req.requestMetadata,
	});

	return success(res, assignment, "Primary branch updated successfully.");
});

const listBranchMembers = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessBranchParamsSchema,
		},
		req,
	);

	const assignment = await branchAssignmentService.listBranchMembers({
		businessId: params.businessId,
		branchId: params.branchId,
	});

	return success(res, assignment);
});

const listMemberBranches = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessMemberParamsSchema,
		},
		req,
	);

	const assignment = await branchAssignmentService.listMemberBranches({
		businessId: params.businessId,
		businessMemberId: params.memberId,
	});

	return success(res, assignment);
});

const deactivate = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: branchAssignmentParamsSchema,
		},
		req,
	);

	const assignment = await branchAssignmentService.deactivate({
		businessId: params.businessId,
		branchId: params.branchId,
		memberId: params.memberId,
		actorId: req.user.id,
		requestMetadata: req.requestMetadata,
	});

	return success(
		res,
		assignment,
		"Branch assignment deactivated successfully.",
	);
});

const reactivate = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: branchAssignmentParamsSchema,
		},
		req,
	);

	const assignment = await branchAssignmentService.reactivate({
		businessId: params.businessId,
		branchId: params.branchId,
		memberId: params.memberId,
		actorId: req.user.id,
		requestMetadata: req.requestMetadata,
	});

	return success(
		res,
		assignment,
		"Branch assignment reactivated successfully.",
	);
});

export default {
	assign,
	setPrimary,
	listBranchMembers,
	listMemberBranches,
	deactivate,
	reactivate,
};
