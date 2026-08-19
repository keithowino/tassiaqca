import { z } from "zod";

import { OFFERING_TYPES } from "../../../shared/index.js";
import { OFFERING_STATUS, OFFERING_VISIBILITY } from "../constants/index.js";

export const listOfferingsQuerySchema = z.object({
	type: z.enum(Object.values(OFFERING_TYPES)).optional(),

	status: z.enum(Object.values(OFFERING_STATUS)).optional(),

	visibility: z.enum(Object.values(OFFERING_VISIBILITY)).optional(),

	search: z.string().trim().optional(),

	page: z.coerce.number().int().positive().default(1),

	limit: z.coerce.number().int().min(1).max(100).default(20),
});

export default listOfferingsQuerySchema;
