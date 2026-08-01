import { z } from "zod";

import {
	emailSchema,
	objectIdSchema,
} from "../../../shared/validation/index.js";

const inviteMemberRequestSchema = z.object({
	email: emailSchema,
	roleId: objectIdSchema,
});

export default inviteMemberRequestSchema;
