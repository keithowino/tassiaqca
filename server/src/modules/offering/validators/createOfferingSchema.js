import { z } from "zod";

import { OFFERING_TYPES } from "../../../shared/platform/offerings/index.js";
import { OFFERING_STATUS, OFFERING_VISIBILITY } from "../constants/index.js";
import { objectIdSchema } from "../../../shared/validation/index.js";

export const createOfferingRequestSchema = z.looseObject({
	type: z.enum(Object.values(OFFERING_TYPES)),

	name: z.string().trim().min(2).max(200),

	description: z.string().trim().max(5000).optional(),

	shortDescription: z.string().trim().max(300).optional(),

	sku: z.string().trim().max(100).optional(),

	/**
	 * Do not remove the commented line below till i confirm it is not needed
	 */
	// categoryId: objectIdSchema.nullable().optional(),

	status: z
		.enum(Object.values(OFFERING_STATUS))
		.default(OFFERING_STATUS.DRAFT),

	visibility: z
		.enum(Object.values(OFFERING_VISIBILITY))
		.default(OFFERING_VISIBILITY.PUBLIC),

	categoryIds: z.array(objectIdSchema).default([]),

	media: z
		.array(
			z.object({
				assetId: z.string().trim().min(1).max(200),

				type: z.enum(["IMAGE", "VIDEO", "DOCUMENT", "AUDIO"]),

				url: z.string().trim().url(),

				alt: z.string().trim().max(300).optional(),

				title: z.string().trim().max(200).optional(),

				position: z.number().int().min(0).optional(),

				featured: z.boolean().optional(),

				metadata: z.record(z.string(), z.unknown()).optional(),
			}),
		)
		.max(100)
		.optional(),

	seo: z
		.object({
			title: z.string().trim().max(200).optional(),

			description: z.string().trim().max(320).optional(),

			keywords: z
				.array(z.string().trim().min(1).max(100))
				.max(50)
				.optional(),

			canonicalUrl: z.string().trim().url().optional(),

			ogImage: z.string().trim().url().optional(),
		})
		.optional(),

	tags: z.array(z.string().trim()).default([]),

	metadata: z.record(z.string(), z.unknown()).default({}),
});

export default createOfferingRequestSchema;
