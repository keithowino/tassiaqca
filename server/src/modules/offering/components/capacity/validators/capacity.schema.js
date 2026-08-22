import { z } from "zod";

export const setCapacitySchema = z.object({
	limit: z
		.number({
			required_error: "Capacity limit is required.",
			invalid_type_error: "Capacity limit must be a number.",
		})
		.int("Capacity limit must be an integer.")
		.min(1, "Capacity limit must be at least 1."),
});

export default setCapacitySchema;
