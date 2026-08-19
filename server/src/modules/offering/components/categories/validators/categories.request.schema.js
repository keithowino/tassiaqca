import { z } from "zod";

import { objectIdSchema } from "../../../../../shared/index.js";

export const setCategoriesRequestSchema = z.object({
	categoryIds: z.array(objectIdSchema).max(100),
});
