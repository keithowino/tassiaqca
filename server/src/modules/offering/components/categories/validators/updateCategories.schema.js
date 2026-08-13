import { z } from "zod";

import categoriesSchema from "./categories.schema.js";

const updateCategoriesSchema = z.object({
	categoryIds: categoriesSchema,
});

export default updateCategoriesSchema;
