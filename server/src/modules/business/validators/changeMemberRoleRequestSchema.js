import { z } from "zod";
import { objectIdSchema } from "../../../shared/index.js";

const changeMemberRoleRequestSchema = {
	params: z.object({
		businessId: objectIdSchema,
		memberId: objectIdSchema,
	}),

	body: z.object({
		roleId: objectIdSchema,
	}),
};

export default changeMemberRoleRequestSchema;
