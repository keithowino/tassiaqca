import { z } from "zod";

import { objectIdSchema } from "../../../../../shared/index.js";

const categoriesSchema = z.array(objectIdSchema).max(100).default([]);

export default categoriesSchema;
