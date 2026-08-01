import { z } from "zod";

import { objectIdSchema } from "../../../shared/validation/index.js";

import { STOCK_MOVEMENT_TYPES } from "../../../shared/constants/index.js";

/**
 * #### .strict() only on request bodies
 * - As we've standardized across the project:
 * - ✅ request bodies → .strict()
 * - ❌ route params → no .strict()
 * - ❌ query params → no .strict()
 */

/*
|--------------------------------------------------------------------------
| Route Params
|--------------------------------------------------------------------------
*/

export const businessParamsSchema = z.object({
	businessId: objectIdSchema,
});

export const stockMovementParamsSchema = z.object({
	businessId: objectIdSchema,
	movementId: objectIdSchema,
});

/*
|--------------------------------------------------------------------------
| Create
|--------------------------------------------------------------------------
*/

export const createStockMovementBodySchema = z
	.object({
		inventoryId: objectIdSchema,

		type: z.enum(STOCK_MOVEMENT_TYPES),

		quantity: z.coerce
			.number()
			.int()
			.positive("Quantity must be greater than zero."),

		reason: z
			.string()
			.trim()
			.min(3, "Reason must be at least 3 characters.")
			.max(250),

		notes: z.string().trim().max(1000).optional(),
	})
	.strict();

/*
|--------------------------------------------------------------------------
| List
|--------------------------------------------------------------------------
*/

export const listStockMovementsQuerySchema = z.object({
	page: z.coerce.number().int().positive().default(1),

	limit: z.coerce.number().int().positive().max(100).default(20),

	type: z.enum(STOCK_MOVEMENT_TYPES).optional(),

	productId: objectIdSchema.optional(),

	inventoryId: objectIdSchema.optional(),

	sort: z
		.enum(["createdAt", "-createdAt", "quantity", "-quantity"])
		.default("-createdAt"),
});

/*
|--------------------------------------------------------------------------
| Default Export
|--------------------------------------------------------------------------
*/

export default {
	businessParamsSchema,
	stockMovementParamsSchema,
	createStockMovementBodySchema,
	listStockMovementsQuerySchema,
};
