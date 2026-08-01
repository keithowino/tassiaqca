import { success } from "../../../shared/utils/apiResponse.js";
import asyncHandler from "../../../shared/utils/asyncHandler.js";
import validateRequest from "../../../shared/validation/validateRequest.js";

import categoryService from "../services/category.service.js";

import {
	createCategoryBodySchema,
	updateCategoryBodySchema,
	listCategoriesQuerySchema,
	businessParamsSchema,
	categoryParamsSchema,
} from "../validators/category.validator.js";

const create = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessParamsSchema,
			body: createCategoryBodySchema,
		},
		req,
	);

	const category = await categoryService.create({
		businessId: params.businessId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, category, "Category created successfully.");
});

const update = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: categoryParamsSchema,
			body: updateCategoryBodySchema,
		},
		req,
	);

	const category = await categoryService.update({
		businessId: params.businessId,
		categoryId: params.categoryId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, category, "Category updated successfully.");
});

const list = asyncHandler(async (req, res) => {
	const { params, query } = validateRequest(
		{
			params: businessParamsSchema,
			query: listCategoriesQuerySchema,
		},
		req,
	);

	const categories = await categoryService.list({
		businessId: params.businessId,
		query,
	});

	return success(res, categories, "Categories retrieved successfully.");
});

const getById = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: categoryParamsSchema,
		},
		req,
	);

	const category = await categoryService.getById({
		businessId: params.businessId,
		categoryId: params.categoryId,
	});

	return success(res, category, "Category retrieved successfully.");
});

const archive = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: categoryParamsSchema,
		},
		req,
	);

	const category = await categoryService.archive({
		businessId: params.businessId,
		categoryId: params.categoryId,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, category, "Category archived successfully.");
});

const restore = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: categoryParamsSchema,
		},
		req,
	);

	const category = await categoryService.restore({
		businessId: params.businessId,
		categoryId: params.categoryId,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, category, "Category restored successfully.");
});

export default {
	create,
	update,
	list,
	getById,
	archive,
	restore,
};
