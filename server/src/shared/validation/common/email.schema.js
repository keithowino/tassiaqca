import { z } from "zod";

const emailSchema = z
	.string({
		error: "Email is required",
	})
	.trim()
	.email("Please provide a valid email address")
	.transform((email) => email.toLowerCase());

export default emailSchema;
