import { z } from "zod";

import { OFFERING_STATUS, OFFERING_VISIBILITY } from "../constants/index.js";
import { objectIdSchema } from "../../../shared/validation/index.js";

const mediaItemSchema = z.object({
	assetId: z.string().trim().min(1).max(200),

	type: z.enum(["IMAGE", "VIDEO", "DOCUMENT", "AUDIO"]),

	url: z.string().trim().url(),

	alt: z.string().trim().max(300).optional(),

	title: z.string().trim().max(200).optional(),

	position: z.number().int().min(0).optional(),

	featured: z.boolean().optional(),

	metadata: z.record(z.string(), z.unknown()).optional(),
});

const seoSchema = z.object({
	title: z.string().trim().max(200).optional(),

	description: z.string().trim().max(320).optional(),

	keywords: z.array(z.string().trim().min(1).max(100)).max(50).optional(),

	canonicalUrl: z.string().trim().url().optional(),

	ogImage: z.string().trim().url().optional(),
});

export const updateOfferingRequestSchema = z
	.looseObject({
		name: z.string().trim().min(2).max(200).optional(),

		description: z.string().trim().max(5000).optional(),

		shortDescription: z.string().trim().max(300).optional(),

		sku: z.string().trim().max(100).optional(),

		status: z.enum(Object.values(OFFERING_STATUS)).optional(),

		visibility: z.enum(Object.values(OFFERING_VISIBILITY)).optional(),

		categoryIds: z.array(objectIdSchema).optional(),

		tags: z.array(z.string().trim()).optional(),

		media: z.array(mediaItemSchema).max(100).optional(),

		seo: seoSchema.optional(),

		metadata: z.record(z.string(), z.unknown()).optional(),
	})
	.refine((value) => Object.keys(value).length > 0, {
		message: "At least one field must be provided.",
	});

export default updateOfferingRequestSchema;
