import { z } from "zod";

import { OFFERING_SUBSCRIPTION_BILLING_INTERVAL_UNIT_VALUES } from "../../../../../shared/index.js";

const billingIntervalUnitSchema = z.enum(
	OFFERING_SUBSCRIPTION_BILLING_INTERVAL_UNIT_VALUES,
);

const billingIntervalCountSchema = z.number().int().min(1);

export const setSubscriptionSchema = z.object({
	active: z.boolean().optional(),

	approvalRequired: z.boolean().optional(),

	billingIntervalUnit: billingIntervalUnitSchema.optional(),

	billingIntervalCount: billingIntervalCountSchema.optional(),

	renewable: z.boolean().optional(),
});

export default setSubscriptionSchema;
