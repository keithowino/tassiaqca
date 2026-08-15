import { z } from "zod";

import attributesSchema from "./attributes.schema.js";

export const createAttributesSchema = z.object({
	attributes: attributesSchema,
});

export default createAttributesSchema;
