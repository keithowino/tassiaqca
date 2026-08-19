import { z } from "zod";

import objectIdSchema from "../../../shared/validation/common/objectId.schema.js";

export const dashboardParamsSchema = z.object({
	businessId: objectIdSchema,
});
