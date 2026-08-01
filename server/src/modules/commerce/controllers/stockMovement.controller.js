import asyncHandler from "../../../shared/utils/asyncHandler.js";
import validateRequest from "../../../shared/validation/validateRequest.js";
import { success } from "../../../shared/utils/apiResponse.js";

import stockMovementService from "../services/stockMovement.service.js";

import {
	businessParamsSchema,
	stockMovementParamsSchema,
	createStockMovementBodySchema,
	listStockMovementsQuerySchema,
} from "../validators/stockMovement.validator.js";

/*
|--------------------------------------------------------------------------
| Create
|--------------------------------------------------------------------------
*/

const create = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessParamsSchema,
			body: createStockMovementBodySchema,
		},
		req,
	);

	const movement = await stockMovementService.create({
		businessId: params.businessId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, movement, "Stock movement recorded successfully.");
});

/*
|--------------------------------------------------------------------------
| List
|--------------------------------------------------------------------------
*/

const list = asyncHandler(async (req, res) => {
	const { params, query } = validateRequest(
		{
			params: businessParamsSchema,
			query: listStockMovementsQuerySchema,
		},
		req,
	);

	const result = await stockMovementService.list({
		businessId: params.businessId,
		query,
	});

	return success(res, result, "Stock movements retrieved successfully.");
});

/*
|--------------------------------------------------------------------------
| Get By ID
|--------------------------------------------------------------------------
*/

const getById = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: stockMovementParamsSchema,
		},
		req,
	);

	const movement = await stockMovementService.getById({
		businessId: params.businessId,
		movementId: params.movementId,
	});

	return success(res, movement, "Stock movement retrieved successfully.");
});

export default {
	create,
	list,
	getById,
};
