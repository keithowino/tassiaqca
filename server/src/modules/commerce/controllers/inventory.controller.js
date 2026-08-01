import { success } from "../../../shared/utils/apiResponse.js";
import asyncHandler from "../../../shared/utils/asyncHandler.js";
import validateRequest from "../../../shared/validation/validateRequest.js";

import inventoryService from "../services/inventory.service.js";

import {
	businessParamsSchema,
	inventoryParamsSchema,
	createInventoryBodySchema,
	updateInventoryBodySchema,
	listInventoryQuerySchema,
} from "../validators/inventory.validator.js";

const create = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessParamsSchema,
			body: createInventoryBodySchema,
		},
		req,
	);

	const inventory = await inventoryService.create({
		businessId: params.businessId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, inventory, "Inventory created successfully.");
});

const update = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: inventoryParamsSchema,
			body: updateInventoryBodySchema,
		},
		req,
	);

	const inventory = await inventoryService.update({
		businessId: params.businessId,
		inventoryId: params.inventoryId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, inventory, "Inventory updated successfully.");
});

const list = asyncHandler(async (req, res) => {
	const { params, query } = validateRequest(
		{
			params: businessParamsSchema,
			query: listInventoryQuerySchema,
		},
		req,
	);

	const inventory = await inventoryService.list({
		businessId: params.businessId,
		query,
	});

	return success(res, inventory, "Inventory retrieved successfully.");
});

const getById = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: inventoryParamsSchema,
		},
		req,
	);

	const inventory = await inventoryService.getById({
		businessId: params.businessId,
		inventoryId: params.inventoryId,
	});

	return success(res, inventory, "Inventory retrieved successfully.");
});

const archive = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: inventoryParamsSchema,
		},
		req,
	);

	const inventory = await inventoryService.archive({
		businessId: params.businessId,
		inventoryId: params.inventoryId,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, inventory, "Inventory archived successfully.");
});

const restore = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: inventoryParamsSchema,
		},
		req,
	);

	const inventory = await inventoryService.restore({
		businessId: params.businessId,
		inventoryId: params.inventoryId,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, inventory, "Inventory restored successfully.");
});

export default {
	create,
	update,
	list,
	getById,
	archive,
	restore,
};
