import { z } from "zod";

import {
	objectIdSchema,
	OFFERING_DURATION_UNIT_VALUES,
	OFFERING_DURATION_STATUS_VALUES,
} from "../../../../../shared/index.js";

const durationUnitSchema = z.enum(OFFERING_DURATION_UNIT_VALUES);
const durationStatusSchema = z.enum(OFFERING_DURATION_STATUS_VALUES);

export const durationCreateSchema = z.object({
	duration: z
		.number({
			required_error: "Duration is required.",
			invalid_type_error: "Duration must be a number.",
		})
		.int("Duration must be a whole number.")
		.positive("Duration must be greater than zero."),

	unit: durationUnitSchema,

	status: z.enum(durationStatusSchema).optional(),
});

export const durationUpdateSchema = z
	.object({
		duration: z
			.number({
				invalid_type_error: "Duration must be a number.",
			})
			.int("Duration must be a whole number.")
			.positive("Duration must be greater than zero.")
			.optional(),

		unit: durationUnitSchema.optional(),

		status: z.enum(durationStatusSchema).optional(),
	})
	.refine(
		(data) =>
			data.duration !== undefined ||
			data.unit !== undefined ||
			data.status !== undefined,
		{
			message: "At least one duration field must be provided.",
		},
	);

export default {
	durationCreateSchema,
	durationUpdateSchema,
};
