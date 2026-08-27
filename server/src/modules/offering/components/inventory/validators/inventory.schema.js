import { z } from "zod";

import { objectIdSchema } from "../../../../../shared/index.js";

export const inventoryQuerySchema = z.object({
	variantId: objectIdSchema.optional(),
});

export const inventoryCreateSchema = z
	.object({
		variantId: objectIdSchema.optional(),

		quantity: z.number().int().min(0).optional(),

		reservedQuantity: z.number().int().min(0).optional(),

		lowStockThreshold: z.number().int().min(0).optional(),

		allowBackorder: z.boolean().optional(),
	})
	.superRefine((data, ctx) => {
		if (
			data.quantity !== undefined &&
			data.reservedQuantity !== undefined &&
			data.reservedQuantity > data.quantity
		) {
			ctx.addIssue({
				code: "custom",
				path: ["reservedQuantity"],
				message: "Reserved quantity cannot exceed inventory quantity.",
			});
		}
	});

export const inventoryUpdateSchema = z
	.object({
		variantId: objectIdSchema.optional(),

		quantity: z.number().int().min(0).optional(),

		reservedQuantity: z.number().int().min(0).optional(),

		lowStockThreshold: z.number().int().min(0).optional(),

		allowBackorder: z.boolean().optional(),
	})
	.refine(
		(data) => {
			if (
				data.quantity !== undefined &&
				data.reservedQuantity !== undefined
			) {
				return data.reservedQuantity <= data.quantity;
			}

			return true;
		},
		{
			path: ["reservedQuantity"],
			message: "Reserved quantity cannot exceed inventory quantity.",
		},
	);
