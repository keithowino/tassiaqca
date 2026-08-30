import { z } from "zod";

const searchOfferingsQuerySchema = z.object({
	search: z
		.string()
		.trim()
		.min(1, "Search query cannot be empty.")
		.optional(),

	type: z
		.string()
		.trim()
		.toUpperCase()
		.min(1, "Offering type cannot be empty.")
		.optional(),

	page: z.coerce.number().int().min(1, "Page must be at least 1.").default(1),

	limit: z.coerce
		.number()
		.int()
		.min(1, "Limit must be at least 1.")
		.max(100, "Limit cannot exceed 100.")
		.default(20),
});

export default searchOfferingsQuerySchema;
