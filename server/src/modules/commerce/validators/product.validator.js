import { z } from "zod";
import { objectIdSchema } from "../../../shared/validation/index.js";
import { PRODUCT_STATUS_VALUES } from "../../../shared/constants/index.js";

/*
|--------------------------------------------------------------------------
| Body Schemas
|--------------------------------------------------------------------------
*/

export const createProductBodySchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, "Product name must be at least 2 characters.")
		.max(150, "Product name cannot exceed 150 characters."),

	shortDescription: z
		.string()
		.trim()
		.max(300, "Short description cannot exceed 300 characters.")
		.optional(),

	description: z.string().trim().optional(),

	sku: z
		.string()
		.trim()
		.max(100, "SKU cannot exceed 100 characters.")
		.optional(),

	categoryId: objectIdSchema.optional(),

	status: z.enum(PRODUCT_STATUS_VALUES).optional(),
});

export const updateProductBodySchema = z.object({
	name: z.string().trim().min(2).max(150).optional(),

	shortDescription: z.string().trim().max(300).optional(),

	description: z.string().trim().optional(),

	sku: z.string().trim().max(100).optional(),

	categoryId: objectIdSchema.nullable().optional(),

	status: z.enum(PRODUCT_STATUS_VALUES).optional(),
});

/*
|--------------------------------------------------------------------------
| Query Schemas
|--------------------------------------------------------------------------
*/

export const listProductsQuerySchema = z.object({
	page: z.coerce.number().int().positive().default(1),

	limit: z.coerce.number().int().positive().max(100).default(20),

	search: z.string().trim().optional(),

	status: z.enum(PRODUCT_STATUS_VALUES).optional(),

	sort: z
		.enum(["createdAt", "-createdAt", "name", "-name"])
		.default("-createdAt"),
});

/*
|--------------------------------------------------------------------------
| Parameter Schemas
|--------------------------------------------------------------------------
*/

export const businessParamsSchema = z.object({
	businessId: objectIdSchema,
});

export const productParamsSchema = z.object({
	businessId: objectIdSchema,
	productId: objectIdSchema,
});

/*
|--------------------------------------------------------------------------
| Compatibility Exports
|--------------------------------------------------------------------------
*/

export const createProductSchema = {
	body: createProductBodySchema,
};

export const updateProductSchema = {
	body: updateProductBodySchema,
};

export const listProductsSchema = {
	query: listProductsQuerySchema,
};

export const archiveProductSchema = {
	params: productParamsSchema,
};

export default {
	createProductBodySchema,
	updateProductBodySchema,
	listProductsQuerySchema,

	businessParamsSchema,
	productParamsSchema,

	createProductSchema,
	updateProductSchema,
	listProductsSchema,
	archiveProductSchema,
};
