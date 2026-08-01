import { z } from "zod";

export const businessParamsSchema = z.object({
	businessId: z.string().min(1),
});

export const businessBranchParamsSchema = z.object({
	businessId: z.string().min(1),
	branchId: z.string().min(1),
});

export const businessMemberParamsSchema = z.object({
	businessId: z.string().min(1),
	memberId: z.string().min(1),
});

export const branchAssignmentParamsSchema = z.object({
	businessId: z.string().min(1),
	branchId: z.string().min(1),
	memberId: z.string().min(1),
});
