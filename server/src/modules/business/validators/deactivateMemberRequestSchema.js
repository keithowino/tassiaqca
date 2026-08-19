import { z } from "zod";
import { objectIdSchema } from "../../../shared/index.js";

const deactivateMemberRequestSchema = {
	params: z.object({
		businessId: objectIdSchema,
		memberId: objectIdSchema,
	}),
};

export default deactivateMemberRequestSchema;
