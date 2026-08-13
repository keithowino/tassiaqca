import { z } from "zod";

import { OFFERING_STATUS, OFFERING_VISIBILITY } from "../constants/index.js";
import { objectIdSchema } from "../../../shared/validation/index.js";

export const updateOfferingRequestSchema = z
	.looseObject({
		name: z.string().trim().min(2).max(200).optional(),

		description: z.string().trim().max(5000).optional(),

		shortDescription: z.string().trim().max(300).optional(),

		sku: z.string().trim().max(100).optional(),

		status: z.enum(Object.values(OFFERING_STATUS)).optional(),

		visibility: z.enum(Object.values(OFFERING_VISIBILITY)).optional(),

		metadata: z.record(z.string(), z.unknown()).optional(),
	})
	.refine((value) => Object.keys(value).length > 0, {
		message: "At least one field must be provided.",
	});

export default updateOfferingRequestSchema;
