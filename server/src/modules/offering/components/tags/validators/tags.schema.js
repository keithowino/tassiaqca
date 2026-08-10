import { z } from "zod";

export const tagsSchema = z.array(z.string().trim().min(1).max(100)).max(50);

export default tagsSchema;
