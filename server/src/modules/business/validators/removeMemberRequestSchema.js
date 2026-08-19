import { z } from "zod";
import { objectIdSchema } from "../../../shared/index.js";

const removeMemberRequestSchema = {
	params: z.object({
		businessId: objectIdSchema,
		memberId: objectIdSchema,
	}),
};

export default removeMemberRequestSchema;
