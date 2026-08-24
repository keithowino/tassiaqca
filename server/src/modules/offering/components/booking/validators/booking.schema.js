import { z } from "zod";

export const setBookingSchema = z
	.object({
		active: z.boolean().optional(),

		confirmationRequired: z.boolean().optional(),

		minimumAdvanceMinutes: z
			.number()
			.int()
			.min(0, "Minimum advance time cannot be negative.")
			.optional(),

		maximumAdvanceMinutes: z
			.number()
			.int()
			.min(0, "Maximum advance time cannot be negative.")
			.nullable()
			.optional(),

		cancellationWindowMinutes: z
			.number()
			.int()
			.min(0, "Cancellation window cannot be negative.")
			.optional(),
	})
	.superRefine((data, context) => {
		if (
			data.minimumAdvanceMinutes !== undefined &&
			data.maximumAdvanceMinutes !== undefined &&
			data.maximumAdvanceMinutes !== null &&
			data.maximumAdvanceMinutes < data.minimumAdvanceMinutes
		) {
			context.addIssue({
				code: "custom",
				path: ["maximumAdvanceMinutes"],
				message:
					"Maximum advance time cannot be less than minimum advance time.",
			});
		}
	});

export default setBookingSchema;
