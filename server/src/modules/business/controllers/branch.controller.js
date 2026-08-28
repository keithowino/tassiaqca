import {
	validateRequest,
	asyncHandler,
	success,
	businessBranchParamsSchema,
	businessParamsSchema,
	branchAssignmentParamsSchema,
} from "../../../shared/index.js";

import { branchService } from "../services/index.js";

import {
	createBranchRequestSchema,
	updateBranchRequestSchema,
} from "../validators/index.js";

const create = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(updateBranchRequestSchema, req);

	const branch = await branchService.create({
		businessId: params.businessId,
		command: body,
		actorId: req.user.id,
		requestMetadata: req.requestMetadata,
	});

	return success(res, branch, "Branch created successfully.", 201);
});

const update = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(createBranchRequestSchema, req);

	const branch = await branchService.update({
		businessId: params.businessId,
		branchId: params.branchId,
		command: body,
		actorId: req.user.id,
		requestMetadata: req.requestMetadata,
	});

	return success(res, branch, "Branch updated successfully.", 201);
});

const deactivate = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessBranchParamsSchema,
		},
		req,
	);

	const branch = await branchService.deactivate({
		businessId: params.businessId,
		branchId: params.branchId,
		actorId: req.user.id,
		requestMetadata: req.requestMetadata,
	});

	return success(res, branch, "Branch deactivated successfully.");
});

const reactivate = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: branchAssignmentParamsSchema,
		},
		req,
	);

	const branch = await branchService.reactivate({
		businessId: params.businessId,
		branchId: params.branchId,
		actorId: req.user.id,
		requestMetadata: req.requestMetadata,
	});

	return success(res, branch, "Branch reactivated successfully.");
});

const list = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessParamsSchema,
		},
		req,
	);

	const branches = await branchService.list({
		businessId: params.businessId,
	});

	return success(res, branches);
});

export default {
	create,
	update,
	deactivate,
	reactivate,
	list,
};
