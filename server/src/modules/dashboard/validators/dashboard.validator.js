import { z } from "zod";

import { objectIdSchema } from "../../../shared/validation/index.js";

export const dashboardParamsSchema = z.object({
	businessId: objectIdSchema,
});
