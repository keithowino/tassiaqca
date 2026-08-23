import { z } from "zod";

export const setLocationSchema = z
	.object({
		name: z
			.string()
			.trim()
			.max(200, "Location name cannot exceed 200 characters.")
			.optional(),

		address: z
			.string()
			.trim()
			.max(500, "Address cannot exceed 500 characters.")
			.optional(),

		city: z
			.string()
			.trim()
			.max(100, "City cannot exceed 100 characters.")
			.optional(),

		county: z
			.string()
			.trim()
			.max(100, "County cannot exceed 100 characters.")
			.optional(),

		country: z
			.string()
			.trim()
			.max(100, "Country cannot exceed 100 characters.")
			.optional(),

		latitude: z.number().min(-90).max(90).nullable().optional(),

		longitude: z.number().min(-180).max(180).nullable().optional(),
	})
	.refine(
		(data) =>
			[data.name, data.address, data.city, data.county].some(
				(value) => typeof value === "string" && value.trim().length > 0,
			) ||
			(data.latitude !== undefined &&
				data.latitude !== null &&
				data.longitude !== undefined &&
				data.longitude !== null),
		{
			message: "Location information is required.",
		},
	)
	.refine(
		(data) =>
			(data.latitude === undefined && data.longitude === undefined) ||
			(data.latitude === null && data.longitude === null) ||
			(data.latitude !== undefined &&
				data.latitude !== null &&
				data.longitude !== undefined &&
				data.longitude !== null),
		{
			message: "Latitude and longitude must be provided together.",
		},
	);

export default setLocationSchema;
