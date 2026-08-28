import { z } from "zod";

import { OFFERING_MEDIA_TYPE_VALUES } from "../../../../../shared/index.js";

const mediaItemSchema = z.object({
	assetId: z.string().trim().min(1).max(200),

	type: z.enum(OFFERING_MEDIA_TYPE_VALUES),

	url: z.string().trim().pipe(z.url()),

	alt: z.string().trim().max(300).optional(),

	title: z.string().trim().max(200).optional(),

	position: z.number().int().min(0).optional(),

	featured: z.boolean().optional(),

	metadata: z.record(z.string(), z.unknown()).optional(),
});

export const mediaSchema = z.array(mediaItemSchema).max(100);

export default mediaSchema;
