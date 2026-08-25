import { z } from "zod";

const enrollmentCountSchema = z.number().int().min(1);

const enrollmentDeadlineSchema = z.number().int().min(0);

export const setEnrollmentSchema = z.object({
	active: z.boolean().optional(),

	approvalRequired: z.boolean().optional(),

	maximumEnrollments: enrollmentCountSchema.nullable().optional(),

	enrollmentDeadlineMinutes: enrollmentDeadlineSchema.nullable().optional(),
});

export default setEnrollmentSchema;
