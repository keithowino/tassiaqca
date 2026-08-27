import { z } from "zod";

import objectIdSchema from "./objectId.schema.js";

export const businessParamsSchema = z.object({
	businessId: objectIdSchema,
});

export const businessOfferingParamsSchema = z.object({
	businessId: objectIdSchema,
	offeringId: objectIdSchema,
});
