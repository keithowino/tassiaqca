import { z } from "zod";

const updateBusinessSchema = z
	.object({
		name: z.string().trim().min(1).optional(),
		description: z.string().optional(),
		phone: z.string().optional(),
		email: z.string().email().optional(),
	})
	.refine((data) => Object.keys(data).length > 0, {
		message: "At least one field must be provided.",
	});

export default updateBusinessSchema;
