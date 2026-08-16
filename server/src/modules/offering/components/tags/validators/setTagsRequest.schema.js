import { z } from "zod";

import tagsSchema from "./tags.schema.js";

export const setTagsRequestSchema = z.object({
	tags: tagsSchema,
});

export default setTagsRequestSchema;
