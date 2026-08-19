import { z } from "zod";
import { objectIdSchema } from "../../../shared/index.js";

const leaveBusinessRequestSchema = {
	params: z.object({
		businessId: objectIdSchema,
	}),
};

export default leaveBusinessRequestSchema;
