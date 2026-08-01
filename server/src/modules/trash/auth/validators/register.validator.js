import { z } from "zod";

const registerSchema = z.object({
	firstName: z
		.string()
		.trim()
		.min(2, "First name must be at least 2 characters.")
		.max(50),

	lastName: z.string().trim().max(50).optional().or(z.literal("")),

	email: z
		.email("Invalid email address.")
		.transform((value) => value.toLowerCase().trim()),

	phone: z.string().trim().optional().or(z.literal("")),

	password: z
		.string()
		.min(8, "Password must be at least 8 characters.")
		.max(100),
});

export default registerSchema;
