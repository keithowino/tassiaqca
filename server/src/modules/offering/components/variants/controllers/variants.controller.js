import {
	validateRequest,
	asyncHandler,
	success,
} from "../../../../../shared/index.js";

import { businessOfferingParamsSchema } from "../../../../../shared/validation/common/params.schema.js";

import { variantSchema, variantsListQuerySchema } from "../validators/index.js";

import { variantsService } from "../services/index.js";

const variantParamsSchema = businessOfferingParamsSchema.extend({
	variantId: businessOfferingParamsSchema.shape.offeringId,
});

const getList = asyncHandler(async (req, res) => {
	const { params, query } = validateRequest(
		{
			params: businessOfferingParamsSchema,
			query: variantsListQuerySchema,
		},
		req,
	);

	const variants = await variantsService.list({
		businessId: params.businessId,
		offeringId: params.offeringId,
		includeArchived: query.includeArchived === "true",
	});

	return success(res, variants, "Offering variants retrieved successfully.");
});

const create = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessOfferingParamsSchema,
			body: variantSchema,
		},
		req,
	);

	const variant = await variantsService.create({
		businessId: params.businessId,
		offeringId: params.offeringId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, variant, "Offering variant created successfully.", 201);
});

const getById = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: variantParamsSchema,
		},
		req,
	);

	const variant = await variantsService.getById({
		businessId: params.businessId,
		offeringId: params.offeringId,
		variantId: params.variantId,
	});

	return success(res, variant, "Offering variant retrieved successfully.");
});

const update = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: variantParamsSchema,
			body: variantSchema.partial(),
		},
		req,
	);

	const variant = await variantsService.update({
		businessId: params.businessId,
		offeringId: params.offeringId,
		variantId: params.variantId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, variant, "Offering variant updated successfully.");
});

const archive = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: variantParamsSchema,
		},
		req,
	);

	const variant = await variantsService.archive({
		businessId: params.businessId,
		offeringId: params.offeringId,
		variantId: params.variantId,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, variant, "Offering variant archived successfully.");
});

const restore = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: variantParamsSchema,
		},
		req,
	);

	const variant = await variantsService.restore({
		businessId: params.businessId,
		offeringId: params.offeringId,
		variantId: params.variantId,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, variant, "Offering variant restored successfully.");
});

export default {
	getList,
	create,
	getById,
	update,
	archive,
	restore,
};
