import { z } from "zod";

import {
	booleanSchema,
	objectIdSchema,
} from "../../../shared/validation/index.js";

/*
|--------------------------------------------------------------------------
| Route Params
|--------------------------------------------------------------------------
*/

export const businessParamsSchema = z
	.object({
		businessId: objectIdSchema,
	})
	.strict();

export const productImageParamsSchema = z
	.object({
		businessId: objectIdSchema,
		imageId: objectIdSchema,
	})
	.strict();

export const ProductParamsSchema = z
	.object({
		businessId: objectIdSchema,
		productId: objectIdSchema,
	})
	.strict();

/*
|--------------------------------------------------------------------------
| Create
|--------------------------------------------------------------------------
*/

export const createProductImageBodySchema = z
	.object({
		productId: objectIdSchema,

		altText: z.string().trim().max(255).optional(),

		isPrimary: booleanSchema.optional(),

		sortOrder: z.coerce.number().int().min(0).default(0),
	})
	.strict();

/*
|--------------------------------------------------------------------------
| Update
|--------------------------------------------------------------------------
*/

export const updateProductImageBodySchema = z
	.object({
		altText: z.string().trim().max(255).optional(),

		sortOrder: z.coerce.number().int().min(0).optional(),
	})
	.strict();

/*
|--------------------------------------------------------------------------
| List
|--------------------------------------------------------------------------
*/

export const listProductImagesQuerySchema = z
	.object({
		page: z.coerce.number().int().positive().default(1),

		limit: z.coerce.number().int().positive().max(100).default(20),

		storageKey: objectIdSchema.optional(),

		isPrimary: booleanSchema.optional(),

		sort: z
			.enum([
				"sortOrder",
				"-sortOrder",
				"createdAt",
				"-createdAt",
				"updatedAt",
				"-updatedAt",
			])
			.default("sortOrder"),
	})
	.strict();

/*
|--------------------------------------------------------------------------
| Set Primary
|--------------------------------------------------------------------------
*/

export const setPrimaryImageBodySchema = z.object({}).strict();

/*
|--------------------------------------------------------------------------
| Default Export
|--------------------------------------------------------------------------
*/

export default {
	businessParamsSchema,

	productImageParamsSchema,

	ProductParamsSchema,

	createProductImageBodySchema,

	updateProductImageBodySchema,

	listProductImagesQuerySchema,

	setPrimaryImageBodySchema,
};
