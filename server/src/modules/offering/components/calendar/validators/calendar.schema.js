import { z } from "zod";

import { OFFERING_CALENDAR_TYPE_VALUES } from "../../../../../shared/index.js";

export const calendarTypeSchema = z.enum(OFFERING_CALENDAR_TYPE_VALUES);

export const setCalendarSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, "Calendar name is required.")
		.max(150, "Calendar name cannot exceed 150 characters."),

	timezone: z
		.string()
		.trim()
		.min(1, "Timezone is required.")
		.max(100, "Timezone cannot exceed 100 characters."),

	type: calendarTypeSchema,

	active: z.boolean().optional(),
});

export default setCalendarSchema;
