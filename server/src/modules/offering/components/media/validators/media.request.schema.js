import { z } from "zod";

import mediaSchema from "./media.schema.js";

export const setMediaRequestSchema = z.object({
	media: mediaSchema,
});
