import { z } from "zod";

const assetIdSchema = z.string().trim().min(1);

const maximumDownloadsSchema = z.number().int().min(1);

const expirationMinutesSchema = z.number().int().min(0);

export const setDownloadSchema = z.object({
	assets: z.array(assetIdSchema).min(1).optional(),

	active: z.boolean().optional(),

	maximumDownloads: maximumDownloadsSchema.nullable().optional(),

	expirationMinutes: expirationMinutesSchema.nullable().optional(),
});

export default setDownloadSchema;
