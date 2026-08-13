import { z } from "zod";

const attributeSchema = z.object({
	name: z.string().trim().min(1).max(100),

	values: z.array(z.string().trim().min(1).max(100)).min(1).max(100),
});

export const attributesSchema = z.array(attributeSchema).max(50);

export default attributesSchema;
