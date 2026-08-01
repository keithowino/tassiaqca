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

export const productPriceParamsSchema = z
	.object({
		businessId: objectIdSchema,
		priceId: objectIdSchema,
	})
	.strict();

export const productParamsSchema = z
	.object({
		businessId: objectIdSchema,
		productId: objectIdSchema,
	})
	.strict();

/*
|--------------------------------------------------------------------------
| Common
|--------------------------------------------------------------------------
*/

const moneySchema = z.coerce.number().positive();

const currencySchema = z
	.string()
	.trim()
	.length(3)
	.transform((value) => value.toUpperCase());

/*
|--------------------------------------------------------------------------
| Create Price
|--------------------------------------------------------------------------
*/

export const createProductPriceBodySchema = z
	.object({
		productId: objectIdSchema,

		sellingPrice: moneySchema,

		costPrice: moneySchema.optional(),

		currency: currencySchema.default("KES"),

		effectiveFrom: z.coerce.date().optional(),

		changeReason: z.string().trim().max(500).optional(),
	})
	.strict();

/*
|--------------------------------------------------------------------------
| Update Price
|--------------------------------------------------------------------------
|
| Prices are immutable.
| Metadata only.
|
*/

export const updateProductPriceBodySchema = z
	.object({
		changeReason: z.string().trim().max(500).optional(),
	})
	.strict();

/*
|--------------------------------------------------------------------------
| List
|--------------------------------------------------------------------------
*/

export const listProductPricesQuerySchema = z
	.object({
		page: z.coerce.number().int().positive().default(1),

		limit: z.coerce.number().int().positive().max(100).default(20),

		productId: objectIdSchema.optional(),

		isCurrent: booleanSchema.optional(),

		sort: z
			.enum([
				"effectiveFrom",
				"-effectiveFrom",
				"createdAt",
				"-createdAt",
			])
			.default("-effectiveFrom"),
	})
	.strict();

/*
|--------------------------------------------------------------------------
| Activate Price
|--------------------------------------------------------------------------
*/

export const activateProductPriceBodySchema = z.object({}).strict();

/*
|--------------------------------------------------------------------------
| Default Export
|--------------------------------------------------------------------------
*/

export default {
	businessParamsSchema,

	productPriceParamsSchema,

	productParamsSchema,

	createProductPriceBodySchema,

	updateProductPriceBodySchema,

	listProductPricesQuerySchema,

	activateProductPriceBodySchema,
};
