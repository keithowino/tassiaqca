import { z } from "zod";
import { objectIdSchema } from "../../../shared/index.js";

const changeMemberRoleRequestSchema = {
	body: z.object({
		roleId: objectIdSchema,
	}),
};

export default changeMemberRoleRequestSchema;
