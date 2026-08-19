import { z } from "zod";

import { OFFERING_VARIANT_STATUS_VALUES } from "../../../../../shared/index.js";

export const variantsListQuerySchema = z.object({
	includeArchived: z.enum(["true", "false"]).optional(),
});

const variantAttributeSchema = z.object({
	name: z.string().trim().min(1).max(100),

	value: z.string().trim().min(1).max(100),
});

export const variantSchema = z.object({
	sku: z.string().trim().min(1).max(100),

	slug: z.string().trim().min(1).max(150).optional(),

	attributes: z.array(variantAttributeSchema).min(1).max(50),

	status: z.enum(OFFERING_VARIANT_STATUS_VALUES).optional(),
});

export const variantsSchema = z.array(variantSchema).max(100);

export default variantsSchema;
