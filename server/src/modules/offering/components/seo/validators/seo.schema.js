import { z } from "zod";

export const seoSchema = z.object({
	title: z.string().trim().max(200).optional(),

	description: z.string().trim().max(320).optional(),

	keywords: z.array(z.string().trim().min(1).max(100)).max(50).optional(),

	canonicalUrl: z.string().trim().url().optional(),

	ogImage: z.string().trim().url().optional(),
});

export default seoSchema;
