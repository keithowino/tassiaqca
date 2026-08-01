import { z } from "zod";

import { objectIdSchema } from "../../../shared/validation/index.js";

import { CATEGORY_STATUS_VALUES } from "../../../shared/constants/index.js";

/*
|--------------------------------------------------------------------------
| Body Schemas
|--------------------------------------------------------------------------
*/

export const createCategoryBodySchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, "Category name must be at least 2 characters.")
		.max(150, "Category name cannot exceed 150 characters."),

	description: z
		.string()
		.trim()
		.max(500, "Description cannot exceed 500 characters.")
		.optional(),

	parentCategoryId: objectIdSchema.nullable().optional(),

	sortOrder: z.coerce.number().int().min(0).default(0),

	status: z.enum(CATEGORY_STATUS_VALUES).optional(),
});

export const updateCategoryBodySchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, "Category name must be at least 2 characters.")
		.max(150, "Category name cannot exceed 150 characters.")
		.optional(),

	description: z
		.string()
		.trim()
		.max(500, "Description cannot exceed 500 characters.")
		.optional(),

	parentCategoryId: objectIdSchema.nullable().optional(),

	sortOrder: z.coerce.number().int().min(0).optional(),

	status: z.enum(CATEGORY_STATUS_VALUES).optional(),
});

/*
|--------------------------------------------------------------------------
| Query Schemas
|--------------------------------------------------------------------------
*/

export const listCategoriesQuerySchema = z.object({
	page: z.coerce.number().int().positive().default(1),

	limit: z.coerce.number().int().positive().max(100).default(20),

	search: z.string().trim().optional(),

	status: z.enum(CATEGORY_STATUS_VALUES).optional(),

	sort: z
		.enum([
			"createdAt",
			"-createdAt",
			"name",
			"-name",
			"sortOrder",
			"-sortOrder",
		])
		.default("sortOrder"),
});

/*
|--------------------------------------------------------------------------
| Parameter Schemas
|--------------------------------------------------------------------------
*/

export const businessParamsSchema = z.object({
	businessId: objectIdSchema,
});

export const categoryParamsSchema = z.object({
	businessId: objectIdSchema,
	categoryId: objectIdSchema,
});

/*
|--------------------------------------------------------------------------
| Compatibility Exports
|--------------------------------------------------------------------------
*/

export const createCategorySchema = {
	body: createCategoryBodySchema,
};

export const updateCategorySchema = {
	body: updateCategoryBodySchema,
};

export const listCategoriesSchema = {
	query: listCategoriesQuerySchema,
};

export const archiveCategorySchema = {
	params: categoryParamsSchema,
};

export default {
	createCategoryBodySchema,
	updateCategoryBodySchema,
	listCategoriesQuerySchema,

	businessParamsSchema,
	categoryParamsSchema,

	createCategorySchema,
	updateCategorySchema,
	listCategoriesSchema,
	archiveCategorySchema,
};
