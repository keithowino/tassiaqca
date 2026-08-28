import {
	validateRequest,
	asyncHandler,
	success,
	businessParamsSchema,
} from "../../../shared/index.js";

import { businessService } from "../services/index.js";

import {
	createBusinessRequestSchema,
	updateBusinessSchema,
} from "../validators/index.js";

const create = asyncHandler(async (req, res) => {
	const { body } = validateRequest(
		{
			body: createBusinessRequestSchema,
		},
		req,
	);

	const business = await businessService.create({
		command: body,
		actorId: req.user.id,
		requestMetadata: req.requestMetadata,
	});

	return success(res, business, "Business created successfully.", 201);
});

const update = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessParamsSchema,
			body: updateBusinessSchema,
		},
		req,
	);

	const business = await businessService.updateBusiness({
		businessId: params.businessId,
		command: body,
		actorId: req.user.id,
		requestMetadata: req.requestMetadata,
	});

	return success(res, business, "Business updated successfully.");
});

const list = asyncHandler(async (req, res) => {
	const businesses = await businessService.listBusinesses({
		actorId: req.user.id,
	});

	return success(res, businesses, "Businesses retrieved successfully.");
});

const get = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessParamsSchema,
		},
		req,
	);

	const business = await businessService.getBusiness({
		businessId: params.businessId,
		actorId: req.user.id,
	});

	return success(res, business, "Business retrieved successfully.");
});

const configuration = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessParamsSchema,
		},
		req,
	);

	const configuration = await businessService.getConfiguration({
		businessId: params.businessId,
		actorId: req.user.id,
	});

	return success(
		res,
		configuration,
		"Business configuration retrieved successfully.",
	);
});

export default {
	create,
	update,
	list,
	get,
	configuration,
};
