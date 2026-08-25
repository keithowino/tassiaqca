import { z } from "zod";

import { objectIdSchema } from "../../../../../shared/index.js";

const instructorIdsSchema = z
	.array(objectIdSchema)
	.min(1)
	.max(100)
	.superRefine((instructors, context) => {
		const unique = new Set(instructors);

		if (unique.size !== instructors.length) {
			context.addIssue({
				code: "custom",
				message: "Duplicate instructors are not allowed.",
			});
		}
	});

export const setInstructorSchema = z.object({
	instructors: instructorIdsSchema,
});

export default setInstructorSchema;
