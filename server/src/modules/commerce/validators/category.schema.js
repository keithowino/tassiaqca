import { z } from "zod";

import { objectIdSchema } from "../../../shared/validation/index.js";

export const createCategorySchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, "Category name must be at least 2 characters.")
		.max(200, "Category name cannot exceed 200 characters."),

	description: z
		.string()
		.trim()
		.max(100, "Description cannot exceed 100 characters.")
		.optional(),

	parentId: objectIdSchema.nullable().optional(),

	position: z.number().int().min(0).optional(),

	metadata: z.record(z.string(), z.unknown()).optional(),
});

export const updateCategorySchema = z
	.object({
		name: z
			.string()
			.trim()
			.min(2, "Category name must be at least 2 characters.")
			.max(200, "Category name cannot exceed 200 characters.")
			.optional(),

		description: z
			.string()
			.trim()
			.max(100, "Description cannot exceed 100 characters.")
			.optional(),

		parentId: objectIdSchema.nullable().optional(),

		position: z.number().int().min(0).optional(),

		metadata: z.record(z.string(), z.unknown()).optional(),
	})
	.refine((value) => Object.keys(value).length > 0, {
		message: "At least one field must be provided.",
	});

export const categoryParamsSchema = z.object({
	businessId: objectIdSchema,

	categoryId: objectIdSchema,
});

export const listCategoriesQuerySchema = z.object({
	status: z.string().optional(),

	parentId: objectIdSchema.nullable().optional(),
});

export default {
	createCategorySchema,
	updateCategorySchema,
	categoryParamsSchema,
	listCategoriesQuerySchema,
};
