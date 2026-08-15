import { z } from "zod";

import attributesSchema from "./attributes.schema.js";

export const updateAttributesSchema = z.object({
	attributes: attributesSchema,
});

export default updateAttributesSchema;
