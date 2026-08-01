import { z } from "zod";

import { objectIdSchema } from "../../../shared/validation/index.js";

import { INVENTORY_STATUS_VALUES } from "../../../shared/constants/index.js";

/*
|--------------------------------------------------------------------------
| Route Params
|--------------------------------------------------------------------------
*/

export const businessParamsSchema = z.object({
	businessId: objectIdSchema,
});

export const inventoryParamsSchema = z.object({
	businessId: objectIdSchema,
	inventoryId: objectIdSchema,
});

export const productInventoryParamsSchema = z.object({
	businessId: objectIdSchema,
	productId: objectIdSchema,
});

/*
|--------------------------------------------------------------------------
| Create
|--------------------------------------------------------------------------
*/

export const createInventoryBodySchema = z
	.object({
		productId: objectIdSchema,

		quantity: z.coerce
			.number()
			.int()
			.min(0, "Quantity cannot be negative."),

		reservedQuantity: z.coerce
			.number()
			.int()
			.min(0, "Reserved quantity cannot be negative.")
			.default(0),

		lowStockThreshold: z.coerce
			.number()
			.int()
			.min(0, "Low stock threshold cannot be negative.")
			.default(0),

		status: z.enum(INVENTORY_STATUS_VALUES).optional(),
	})
	.strict();

/*
|--------------------------------------------------------------------------
| Update
|--------------------------------------------------------------------------
*/

export const updateInventoryBodySchema = z
	.object({
		lowStockThreshold: z.coerce.number().int().min(0).optional(),

		status: z.enum(INVENTORY_STATUS_VALUES).optional(),
	})
	.strict();

/*
|--------------------------------------------------------------------------
| List
|--------------------------------------------------------------------------
*/

export const listInventoryQuerySchema = z.object({
	page: z.coerce.number().int().positive().default(1),

	limit: z.coerce.number().int().positive().max(100).default(20),

	search: z.string().trim().optional(),

	status: z.enum(INVENTORY_STATUS_VALUES).optional(),

	sort: z
		.enum([
			"createdAt",
			"-createdAt",
			"quantity",
			"-quantity",
			"updatedAt",
			"-updatedAt",
		])
		.default("-createdAt"),
});

/*
|--------------------------------------------------------------------------
| Stock Adjustment
|--------------------------------------------------------------------------
*/

export const adjustStockBodySchema = z
	.object({
		quantity: z.coerce.number().int(),

		reason: z.string().trim().min(3).max(250),
	})
	.strict();

/*
|--------------------------------------------------------------------------
| Default Export
|--------------------------------------------------------------------------
*/

export default {
	businessParamsSchema,
	inventoryParamsSchema,
	productInventoryParamsSchema,

	createInventoryBodySchema,
	updateInventoryBodySchema,
	listInventoryQuerySchema,
	adjustStockBodySchema,
};
