import { z } from "zod";
import { businessBranchParamsSchema } from "./branchParamsSchema.js";

const assignBranchMemberRequestSchema = {
	params: businessBranchParamsSchema,

	body: z.object({
		businessMemberId: z.string().min(1),
	}),
};

export default assignBranchMemberRequestSchema;
