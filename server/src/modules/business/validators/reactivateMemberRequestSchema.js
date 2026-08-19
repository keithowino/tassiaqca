import { z } from "zod";
import { objectIdSchema } from "../../../shared/index.js";

const reactivateMemberRequestSchema = {
	params: z.object({
		businessId: objectIdSchema,
		memberId: objectIdSchema,
	}),
};

export default reactivateMemberRequestSchema;
