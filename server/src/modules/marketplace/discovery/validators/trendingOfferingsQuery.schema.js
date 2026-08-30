import { z } from "zod";

import { OFFERING_TYPE_VALUES } from "../../../../shared/index.js";

export const trendingOfferingsQuerySchema = z.object({
	page: z.coerce.number().int().min(1).default(1),

	limit: z.coerce.number().int().min(1).max(100).default(20),

	type: z.enum(OFFERING_TYPE_VALUES).optional(),
});
