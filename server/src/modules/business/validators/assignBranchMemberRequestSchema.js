import { z } from "zod";
import { businessBranchParamsSchema } from "../../../shared/index.js";

const assignBranchMemberRequestSchema = {
	params: businessBranchParamsSchema,

	body: z.object({
		businessMemberId: z.string().min(1),
	}),
};

export default assignBranchMemberRequestSchema;
