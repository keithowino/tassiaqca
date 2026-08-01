import { success } from "../../../shared/utils/apiResponse.js";
import asyncHandler from "../../../shared/utils/asyncHandler.js";
import validateRequest from "../../../shared/validation/validateRequest.js";

import productService from "../services/product.service.js";

import {
	createProductBodySchema,
	updateProductBodySchema,
	listProductsQuerySchema,
	productParamsSchema,
} from "../validators/product.validator.js";

const create = asyncHandler(async (req, res) => {
	const { body } = validateRequest(
		{
			body: createProductBodySchema,
		},
		req,
	);

	const product = await productService.create({
		businessId: req.params.businessId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, product, "Product created successfully.");
});

const update = asyncHandler(async (req, res) => {
	const { body } = validateRequest(
		{
			body: updateProductBodySchema,
		},
		req,
	);

	const product = await productService.update({
		businessId: req.params.businessId,
		productId: req.params.productId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, product, "Product updated successfully.");
});

const list = asyncHandler(async (req, res) => {
	const { query } = validateRequest(
		{
			query: listProductsQuerySchema,
		},
		req,
	);

	const products = await productService.list({
		businessId: req.params.businessId,
		query,
	});

	return success(res, products, "Products retrieved successfully.");
});

const getById = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: productParamsSchema,
		},
		req,
	);

	const product = await productService.getById({
		businessId: params.businessId,
		productId: params.productId,
	});

	return success(res, product, "Product retrieved successfully.");
});

const archive = asyncHandler(async (req, res) => {
	validateRequest(
		{
			params: productParamsSchema,
		},
		req,
	);

	const product = await productService.archive({
		businessId: req.params.businessId,
		productId: req.params.productId,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, product, "Product archived successfully.");
});

const restore = asyncHandler(async (req, res) => {
	validateRequest(
		{
			params: productParamsSchema,
		},
		req,
	);

	const product = await productService.restore({
		businessId: req.params.businessId,
		productId: req.params.productId,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, product, "Product restored successfully.");
});

export default {
	create,
	update,
	list,
	getById,
	archive,
	restore,
};
