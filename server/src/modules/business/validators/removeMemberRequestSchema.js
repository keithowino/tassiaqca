import { z } from "zod";
import { objectIdSchema } from "../../../shared/validation/index.js";

const removeMemberRequestSchema = {
	params: z.object({
		businessId: objectIdSchema,
		memberId: objectIdSchema,
	}),
};

export default removeMemberRequestSchema;
