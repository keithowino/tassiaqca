import { z } from "zod";
import { objectIdSchema } from "../../../shared/validation/index.js";

export const offeringParamsSchema = z.object({
	businessId: objectIdSchema,
	offeringId: objectIdSchema,
});

export default offeringParamsSchema;
