import { z } from "zod";

import { businessParamsSchema } from "../../../shared/index.js";

const createBranchRequestSchema = {
	params: businessParamsSchema,

	body: z.object({
		name: z.string().trim().min(2).max(100),

		description: z.string().trim().max(500).optional(),

		phone: z.string().trim().max(30).optional(),

		email: z.email().optional(),

		address: z.string().trim().min(2).max(255),

		city: z.string().trim().max(100).optional(),

		county: z.string().trim().max(100).optional(),

		latitude: z.number().optional(),

		longitude: z.number().optional(),

		isHeadOffice: z.boolean().optional(),
	}),
};

export default createBranchRequestSchema;
