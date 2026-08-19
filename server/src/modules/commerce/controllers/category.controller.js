import categoryService from "../services/category.service.js";

import { validateRequest, success } from "../../../shared/index.js";

import {
	createCategorySchema,
	updateCategorySchema,
	categoryParamsSchema,
	listCategoriesQuerySchema,
} from "../validators/category.schema.js";

import categoryPresenter from "../presenters/category.presenter.js";

class CategoryController {
	async create(req, res, next) {
		try {
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
		} catch (error) {
			next(error);
		}
	}

	async list(req, res, next) {
		try {
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

			return success(
				res,
				categoryPresenter.presentCollection(categories),
				"Categories retrieved successfully.",
			);
		} catch (error) {
			next(error);
		}
	}

	async get(req, res, next) {
		try {
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
		} catch (error) {
			next(error);
		}
	}

	async update(req, res, next) {
		try {
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
		} catch (error) {
			next(error);
		}
	}

	async archive(req, res, next) {
		try {
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
		} catch (error) {
			next(error);
		}
	}

	async restore(req, res, next) {
		try {
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
		} catch (error) {
			next(error);
		}
	}
}

export default new CategoryController();
