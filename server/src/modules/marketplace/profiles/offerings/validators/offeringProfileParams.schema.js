import { z } from "zod";

const offeringProfileParamsSchema = z.object({
	slug: z.string().trim().min(1),
});

export default offeringProfileParamsSchema;
