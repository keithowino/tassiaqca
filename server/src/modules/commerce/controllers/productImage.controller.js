import asyncHandler from "../../../shared/utils/asyncHandler.js";
import validateRequest from "../../../shared/validation/validateRequest.js";
import { success } from "../../../shared/utils/apiResponse.js";

import productImageService from "../services/productImage.service.js";

import {
	businessParamsSchema,
	productImageParamsSchema,
	createProductImageBodySchema,
	updateProductImageBodySchema,
	listProductImagesQuerySchema,
} from "../validators/productImage.validator.js";
import { AppError, ErrorCodes } from "../../../shared/errors/index.js";
import { HTTP_STATUS } from "../../../shared/constants/index.js";

/*
|--------------------------------------------------------------------------
| Create
|--------------------------------------------------------------------------
*/

const create = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessParamsSchema,
			body: createProductImageBodySchema,
		},
		req,
	);

	if (!req.file) {
		throw new AppError(
			"Image file is required.",
			HTTP_STATUS.BAD_REQUEST,
			ErrorCodes.VALIDATION_ERROR,
		);
	}

	const image = await productImageService.create({
		businessId: params.businessId,
		data: {
			...body,
			file: req.file,
		},
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, image, "Product image created successfully.");
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
			query: listProductImagesQuerySchema,
		},
		req,
	);

	const result = await productImageService.list({
		businessId: params.businessId,
		query,
	});

	return success(res, result, "Product images retrieved successfully.");
});

/*
|--------------------------------------------------------------------------
| Get By ID
|--------------------------------------------------------------------------
*/

const getById = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: productImageParamsSchema,
		},
		req,
	);

	const image = await productImageService.getById({
		businessId: params.businessId,
		imageId: params.imageId,
	});

	return success(res, image, "Product image retrieved successfully.");
});

/*
|--------------------------------------------------------------------------
| Update
|--------------------------------------------------------------------------
*/

const update = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: productImageParamsSchema,
			body: updateProductImageBodySchema,
		},
		req,
	);

	const image = await productImageService.update({
		businessId: params.businessId,
		imageId: params.imageId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, image, "Product image updated successfully.");
});

/*
|--------------------------------------------------------------------------
| Set Primary
|--------------------------------------------------------------------------
*/

const setPrimary = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: productImageParamsSchema,
		},
		req,
	);

	const image = await productImageService.setPrimary({
		businessId: params.businessId,
		imageId: params.imageId,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, image, "Primary product image updated successfully.");
});

/*
|--------------------------------------------------------------------------
| Delete
|--------------------------------------------------------------------------
*/

const remove = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: productImageParamsSchema,
		},
		req,
	);

	await productImageService.remove({
		businessId: params.businessId,
		imageId: params.imageId,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, null, "Product image deleted successfully.");
});

export default {
	create,
	update,
	list,
	getById,
	setPrimary,
	remove,
};
