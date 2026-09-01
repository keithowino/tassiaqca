import { z } from "zod";

const categoryQuerySchema = z.object({
	search: z.string().trim().min(1).optional(),

	businessId: z.string().trim().min(1).optional(),

	parentId: z.string().trim().min(1).optional(),

	page: z.coerce.number().int().min(1).default(1),

	limit: z.coerce.number().int().min(1).max(100).default(20),
});

export default categoryQuerySchema;
