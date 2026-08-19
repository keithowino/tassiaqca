import { z } from "zod";

import { objectIdSchema } from "../../../shared/index.js";

const transferOwnershipRequestSchema = {
	params: z.object({
		businessId: objectIdSchema,
		memberId: objectIdSchema,
	}),
};

export default transferOwnershipRequestSchema;
