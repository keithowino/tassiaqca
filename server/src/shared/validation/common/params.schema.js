import { z } from "zod";

import objectIdSchema from "./objectId.schema.js";

export const businessParamsSchema = z.object({
	businessId: objectIdSchema,
});

export const businessBranchParamsSchema = z.object({
	businessId: objectIdSchema,
	branchId: objectIdSchema,
});

export const businessMemberParamsSchema = z.object({
	businessId: objectIdSchema,
	memberId: objectIdSchema,
});

export const branchAssignmentParamsSchema = z.object({
	businessId: objectIdSchema,
	branchId: objectIdSchema,
	memberId: objectIdSchema,
});

export const businessOfferingParamsSchema = z.object({
	businessId: objectIdSchema,
	offeringId: objectIdSchema,
});
