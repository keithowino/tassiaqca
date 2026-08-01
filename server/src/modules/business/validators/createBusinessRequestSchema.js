import { z } from "zod";

const createBusinessRequestSchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, "Business name must be at least 2 characters."),

	description: z.string().trim().optional(),

	businessType: z
		.string()
		.trim()
		.min(1, "Business type is required.")
		.transform((value) => value.toUpperCase()),

	phone: z.string().trim().optional(),

	email: z.string().email("Please provide a valid email address.").optional(),

	logo: z.string().optional(),

	coverImage: z.string().optional(),
});

export default createBusinessRequestSchema;
