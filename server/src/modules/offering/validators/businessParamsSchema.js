import { z } from "zod";
import { objectIdSchema } from "../../../shared/validation/index.js";

export const businessParamsSchema = z.object({
	businessId: objectIdSchema,
});

export default businessParamsSchema;
