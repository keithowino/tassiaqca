import { z } from "zod";

import { objectIdSchema } from "../../../../../shared/validation/index.js";

const categoriesSchema = z.array(objectIdSchema).max(100).default([]);

export default categoriesSchema;
