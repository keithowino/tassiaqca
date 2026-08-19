import { z } from "zod";
import { objectIdSchema } from "../../../shared/index.js";

export const offeringParamsSchema = z.object({
	businessId: objectIdSchema,
	offeringId: objectIdSchema,
});

export default offeringParamsSchema;
