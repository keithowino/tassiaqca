import { z } from "zod";

import { objectIdSchema } from "../../../../../shared/validation/index.js";

export const businessOfferingParamsSchema = z.object({
	businessId: objectIdSchema,
	offeringId: objectIdSchema,
});
