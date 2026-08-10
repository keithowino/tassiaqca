import { z } from "zod";

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

export const mediaSchema = z.array(mediaItemSchema).max(100);

export default mediaSchema;
