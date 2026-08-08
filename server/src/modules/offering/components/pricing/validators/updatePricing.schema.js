import { createPricingSchema } from "./createPricing.schema.js";

export const updatePricingSchema = createPricingSchema.partial();
