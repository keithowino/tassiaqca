import { z } from "zod";
import {
	objectIdSchema,
	PRODUCT_STATUS_VALUES,
} from "../../../shared/index.js";

/*
|--------------------------------------------------------------------------
| Body Schemas
|--------------------------------------------------------------------------
*/

export const createProductBodySchema = z.object({
	sku: z
		.string()
		.trim()
		.max(100, "SKU cannot exceed 100 characters.")
		.optional(),

	categoryId: objectIdSchema.optional(),
});

export const updateProductBodySchema = z.object({
	sku: z.string().trim().max(100).optional(),

	categoryId: objectIdSchema.nullable().optional(),
});

/*
|--------------------------------------------------------------------------
| Query Schemas
|--------------------------------------------------------------------------
*/

export const listProductsQuerySchema = z.object({
	page: z.coerce.number().int().positive().default(1),

	limit: z.coerce.number().int().positive().max(100).default(20),

	sort: z.enum(["createdAt", "-createdAt"]).default("-createdAt"),
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
