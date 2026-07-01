import { z } from "zod";
import objectIdSchema from "../../../shared/validation/common/objectId.schema.js";

const createBusinessRequestSchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, "Business name must be at least 2 characters."),

	description: z.string().trim().optional(),

	businessType: objectIdSchema,

	phone: z.string().trim().optional(),

	email: z.string().email("Please provide a valid email address.").optional(),

	logo: z.string().optional(),

	coverImage: z.string().optional(),
});

export default createBusinessRequestSchema;
