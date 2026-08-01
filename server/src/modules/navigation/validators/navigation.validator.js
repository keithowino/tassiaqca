import { z } from "zod";

import { objectIdSchema } from "../../../shared/validation/index.js";

export const navigationParamsSchema = z.object({
	businessId: objectIdSchema,
});
