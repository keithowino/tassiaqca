import { z } from "zod";

import { BUSINESS_TYPE_VALUES } from "../../../../shared/index.js";

export const businessDiscoveryQuerySchema = z.object({
	page: z.coerce.number().int().min(1).default(1),

	limit: z.coerce.number().int().min(1).max(100).default(20),

	search: z.string().trim().min(1).max(100).optional(),

	businessType: z.enum(BUSINESS_TYPE_VALUES).optional(),
});
