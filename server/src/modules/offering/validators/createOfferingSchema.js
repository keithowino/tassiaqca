import { z } from "zod";

import { OFFERING_TYPES } from "../../../shared/platform/offerings/index.js";
import { OFFERING_STATUS, OFFERING_VISIBILITY } from "../constants/index.js";
import { objectIdSchema } from "../../../shared/validation/index.js";

export const createOfferingRequestSchema = z.object({
	type: z.enum(Object.values(OFFERING_TYPES)),

	name: z.string().trim().min(2).max(200),

	description: z.string().trim().max(5000).optional(),

	shortDescription: z.string().trim().max(300).optional(),

	sku: z.string().trim().max(100).optional(),

	categoryId: objectIdSchema.nullable().optional(),

	status: z
		.enum(Object.values(OFFERING_STATUS))
		.default(OFFERING_STATUS.DRAFT),

	visibility: z
		.enum(Object.values(OFFERING_VISIBILITY))
		.default(OFFERING_VISIBILITY.PUBLIC),

	categoryIds: z.array(objectIdSchema).default([]),

	tags: z.array(z.string().trim()).default([]),

	metadata: z.record(z.string(), z.unknown()).default({}),
});

export default createOfferingRequestSchema;
