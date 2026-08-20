import {
	validateRequest,
	asyncHandler,
	success,
} from "../../../../../shared/index.js";

import { durationService } from "../services/index.js";

import {
	durationParamsSchema,
	durationCreateSchema,
	durationUpdateSchema,
} from "../validators/index.js";

const getDuration = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: durationParamsSchema,
		},
		req,
	);

	const duration = await durationService.get({
		businessId: params.businessId,
		offeringId: params.offeringId,
	});

	return success(res, duration, "Offering duration retrieved successfully.");
});

const createDuration = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: durationParamsSchema,
			body: durationCreateSchema,
		},
		req,
	);

	const duration = await durationService.create({
		businessId: params.businessId,
		offeringId: params.offeringId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, duration, "Offering duration created successfully.");
});

const updateDuration = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: durationParamsSchema,
			body: durationUpdateSchema,
		},
		req,
	);

	const duration = await durationService.update({
		businessId: params.businessId,
		offeringId: params.offeringId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, duration, "Offering duration updated successfully.");
});

const archiveDuration = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: durationParamsSchema,
		},
		req,
	);

	const duration = await durationService.archive({
		businessId: params.businessId,
		offeringId: params.offeringId,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, duration, "Offering duration archived successfully.");
});

const restoreDuration = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: durationParamsSchema,
		},
		req,
	);

	const duration = await durationService.restore({
		businessId: params.businessId,
		offeringId: params.offeringId,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, duration, "Offering duration restored successfully.");
});

export default {
	getDuration,
	createDuration,
	updateDuration,
	archiveDuration,
	restoreDuration,
};
