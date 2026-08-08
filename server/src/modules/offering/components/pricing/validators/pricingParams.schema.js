import { z } from "zod";

export const pricingParamsSchema = z.object({
	businessId: z.string(),

	offeringId: z.string(),

	pricingId: z.string(),
});
