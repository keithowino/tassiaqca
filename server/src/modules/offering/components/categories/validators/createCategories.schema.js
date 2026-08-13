import { z } from "zod";

import categoriesSchema from "./categories.schema.js";

const createCategoriesSchema = z.object({
	categoryIds: categoriesSchema,
});

export default createCategoriesSchema;
