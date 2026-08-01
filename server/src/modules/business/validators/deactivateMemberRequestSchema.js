import { z } from "zod";
import { objectIdSchema } from "../../../shared/validation/index.js";

const deactivateMemberRequestSchema = {
	params: z.object({
		businessId: objectIdSchema,
		memberId: objectIdSchema,
	}),
};

export default deactivateMemberRequestSchema;
