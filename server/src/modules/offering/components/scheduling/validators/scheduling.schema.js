import { z } from "zod";

import { OFFERING_SCHEDULING_MODE_VALUES } from "../../../../../shared/index.js";

export const schedulingModeSchema = z.enum(OFFERING_SCHEDULING_MODE_VALUES);

export const setSchedulingSchema = z.object({
	mode: schedulingModeSchema,

	timezone: z
		.string()
		.trim()
		.min(1, "Timezone is required.")
		.max(100, "Timezone cannot exceed 100 characters."),

	active: z.boolean().optional(),
});

export default setSchedulingSchema;
