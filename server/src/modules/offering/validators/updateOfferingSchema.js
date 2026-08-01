import { z } from "zod";

import { OFFERING_STATUS, OFFERING_VISIBILITY } from "../constants/index.js";
import { objectIdSchema } from "../../../shared/validation/index.js";

export const updateOfferingRequestSchema = z
	.object({
		name: z.string().trim().min(2).max(200).optional(),

		description: z.string().trim().max(5000).optional(),

		status: z.enum(Object.values(OFFERING_STATUS)).optional(),

		visibility: z.enum(Object.values(OFFERING_VISIBILITY)).optional(),

		categoryIds: z.array(objectIdSchema).default([]),

		tags: z.array(z.string().trim()).optional(),

		metadata: z.record(z.string(), z.unknown()).optional(),
	})
	.refine((value) => Object.keys(value).length > 0, {
		message: "At least one field must be provided.",
	});

export default updateOfferingRequestSchema;
