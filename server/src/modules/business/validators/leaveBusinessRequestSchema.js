import { z } from "zod";
import { objectIdSchema } from "../../../shared/validation/index.js";

const leaveBusinessRequestSchema = {
	params: z.object({
		businessId: objectIdSchema,
	}),
};

export default leaveBusinessRequestSchema;
