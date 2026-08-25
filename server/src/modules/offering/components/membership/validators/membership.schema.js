import { z } from "zod";

const membershipDurationSchema = z.number().int().min(1);

export const setMembershipSchema = z.object({
	active: z.boolean().optional(),

	approvalRequired: z.boolean().optional(),

	durationMinutes: membershipDurationSchema.nullable().optional(),

	renewable: z.boolean().optional(),
});

export default setMembershipSchema;
