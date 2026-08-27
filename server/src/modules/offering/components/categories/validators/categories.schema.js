import { z } from "zod";

import objectIdSchema from "../../../../../shared/validation/common/objectId.schema.js";

const categoriesSchema = z.array(objectIdSchema).max(100).default([]);

export default categoriesSchema;
