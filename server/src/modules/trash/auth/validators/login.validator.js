import { z } from "zod";

const loginSchema = z.object({
	email: z.email().transform((value) => value.toLowerCase().trim()),

	password: z.string().min(1),
});

export default loginSchema;
