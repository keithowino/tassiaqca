import { z } from "zod";

const maximumRegistrationsSchema = z
	.number()
	.int()
	.min(1, "Maximum registrations must be at least 1.");

const registrationDeadlineMinutesSchema = z
	.number()
	.int()
	.min(0, "Registration deadline cannot be negative.");

export const setRegistrationSchema = z.object({
	active: z.boolean().optional(),

	approvalRequired: z.boolean().optional(),

	maximumRegistrations: maximumRegistrationsSchema.nullable().optional(),

	registrationDeadlineMinutes: registrationDeadlineMinutesSchema
		.nullable()
		.optional(),
});

export default setRegistrationSchema;
