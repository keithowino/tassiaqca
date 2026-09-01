import { categoryService } from "../services/index.js";

import {
	validateRequest,
	asyncHandler,
	success,
} from "../../../shared/index.js";

import {
	createCategorySchema,
	updateCategorySchema,
	categoryParamsSchema,
	listCategoriesQuerySchema,
} from "../validators/category.schema.js";

const create = asyncHandler(async (req, res) => {
	const { body, params } = validateRequest(
		{
			body: createCategorySchema,
			params: categoryParamsSchema.pick({
				businessId: true,
			}),
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

const list = asyncHandler(async (req, res) => {
	const { params, query } = validateRequest(
		{
			params: categoryParamsSchema.pick({
				businessId: true,
			}),
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

const get = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: categoryParamsSchema,
		},
		req,
	);

	const category = await categoryService.get({
		businessId: params.businessId,
		categoryId: params.categoryId,
	});

	return success(res, category, "Category retrieved successfully.");
});

const update = asyncHandler(async (req, res) => {
	const { body, params } = validateRequest(
		{
			body: updateCategorySchema,
			params: categoryParamsSchema,
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

	return success(res, category, "Category archive successfully.");
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
	list,
	get,
	update,
	archive,
	restore,
};
