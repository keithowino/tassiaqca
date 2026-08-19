import { z } from "zod";

import { emailSchema, objectIdSchema } from "../../../shared/index.js";

const inviteMemberRequestSchema = z.object({
	email: emailSchema,
	roleId: objectIdSchema,
});

export default inviteMemberRequestSchema;
