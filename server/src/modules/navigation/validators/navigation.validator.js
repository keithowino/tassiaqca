import { z } from "zod";

import { objectIdSchema } from "../../../shared/index.js";

export const navigationParamsSchema = z.object({
	businessId: objectIdSchema,
});
