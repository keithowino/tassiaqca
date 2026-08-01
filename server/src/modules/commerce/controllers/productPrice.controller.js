import asyncHandler from "../../../shared/utils/asyncHandler.js";
import validateRequest from "../../../shared/validation/validateRequest.js";
import { success } from "../../../shared/utils/apiResponse.js";

import productPriceService from "../services/productPrice.service.js";

import {
	businessParamsSchema,
	productPriceParamsSchema,
	createProductPriceBodySchema,
	listProductPricesQuerySchema,
} from "../validators/productPrice.validator.js";

const create = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessParamsSchema,
			body: createProductPriceBodySchema,
		},
		req,
	);

	const price = await productPriceService.create({
		businessId: params.businessId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, price, "Product price created successfully.");
});

const list = asyncHandler(async (req, res) => {
	const { params, query } = validateRequest(
		{
			params: businessParamsSchema,
			query: listProductPricesQuerySchema,
		},
		req,
	);

	const result = await productPriceService.list({
		businessId: params.businessId,
		query,
	});

	return success(res, result, "Product prices retrieved successfully.");
});

const getById = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: productPriceParamsSchema,
		},
		req,
	);

	const price = await productPriceService.getById({
		businessId: params.businessId,
		priceId: params.priceId,
	});

	return success(res, price, "Product price retrieved successfully.");
});

export default {
	create,
	list,
	getById,
};
