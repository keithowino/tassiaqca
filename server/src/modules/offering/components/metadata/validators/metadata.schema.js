import { z } from "zod";

export const metadataSchema = z.record(z.string(), z.unknown());

export default metadataSchema;
