import { z } from "zod";

import {
	BILLING_MODEL_VALUES,
	CURRENCY_VALUES,
	OFFERING_PRICE_STATUS,
} from "../../../../../shared/constants/index.js";

export const createPricingSchema = z.object({
	amount: z.coerce.number().min(0),

	costPrice: z.coerce.number().min(0).nullable().optional(),

	currency: z.enum(CURRENCY_VALUES).optional(),

	billingModel: z.enum(BILLING_MODEL_VALUES).optional(),

	effectiveFrom: z.coerce.date().optional(),

	effectiveTo: z.coerce.date().nullable().optional(),

	changeReason: z.string().trim().max(500).optional(),

	status: z.enum(Object.values(OFFERING_PRICE_STATUS)).optional(),

	metadata: z.record(z.any()).optional(),
});
