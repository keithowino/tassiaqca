import { z } from "zod";

import { businessBranchParamsSchema } from "../../../shared/index.js";

const updateBranchRequestSchema = {
	params: businessBranchParamsSchema,

	body: z.object({
		name: z.string().trim().min(2).max(120).optional(),

		description: z.string().trim().max(1000).optional(),

		phone: z.string().trim().max(50).nullable().optional(),

		email: z.string().email().nullable().optional(),

		address: z.string().trim().min(2).max(255).optional(),

		city: z.string().trim().max(120).optional(),

		county: z.string().trim().max(120).optional(),

		latitude: z.number().nullable().optional(),

		longitude: z.number().nullable().optional(),

		active: z.boolean().optional(),

		isHeadOffice: z.boolean().optional(),
	}),
};

export default updateBranchRequestSchema;
