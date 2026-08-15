import { z } from "zod";

import attributesSchema from "./attributes.schema.js";

export const setAttributesRequestSchema = z.object({
	attributes: attributesSchema,
});

export default setAttributesRequestSchema;
