import {
	validateRequest,
	asyncHandler,
	success,
	businessOfferingParamsSchema,
} from "../../../../../shared/index.js";

import { inventoryService } from "../services/index.js";

import {
	inventoryQuerySchema,
	inventoryCreateSchema,
	inventoryUpdateSchema,
} from "../validators/index.js";

const listInventory = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessOfferingParamsSchema,
		},
		req,
	);

	const inventories = await inventoryService.list({
		businessId: params.businessId,
		offeringId: params.offeringId,
	});

	return success(
		res,
		inventories,
		"Offering inventory retrieved successfully.",
	);
});

const getInventory = asyncHandler(async (req, res) => {
	const { params, query } = validateRequest(
		{
			params: businessOfferingParamsSchema,
			query: inventoryQuerySchema,
		},
		req,
	);

	const inventory = await inventoryService.get({
		businessId: params.businessId,
		offeringId: params.offeringId,
		variantId: query.variantId ?? null,
	});

	return success(
		res,
		inventory,
		"Offering inventory retrieved successfully.",
	);
});

const createInventory = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessOfferingParamsSchema,
			body: inventoryCreateSchema,
		},
		req,
	);

	const inventory = await inventoryService.create({
		businessId: params.businessId,
		offeringId: params.offeringId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, inventory, "Offering inventory created successfully.");
});

const updateInventory = asyncHandler(async (req, res) => {
	const { params, query, body } = validateRequest(
		{
			params: businessOfferingParamsSchema,
			query: inventoryQuerySchema,
			body: inventoryUpdateSchema,
		},
		req,
	);

	const inventory = await inventoryService.update({
		businessId: params.businessId,
		offeringId: params.offeringId,
		variantId: query.variantId ?? null,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, inventory, "Offering inventory updated successfully.");
});

export default {
	listInventory,
	getInventory,
	createInventory,
	updateInventory,
};
