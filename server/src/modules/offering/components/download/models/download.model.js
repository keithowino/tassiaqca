import mongoose from "mongoose";

const offeringDownloadSchema = new mongoose.Schema(
	{
		business: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Business",
			required: true,
			index: true,
		},

		offering: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Offering",
			required: true,
			index: true,
		},

		/**
		 * References assets owned by the Files platform service.
		 *
		 * The Download component does not own binary storage.
		 */
		assets: {
			type: [String],
			required: true,
			validate: {
				validator: (value) => Array.isArray(value) && value.length > 0,
				message: "At least one downloadable asset is required.",
			},
		},

		active: {
			type: Boolean,
			default: true,
			index: true,
		},

		/**
		 * Maximum number of downloads permitted per customer/access grant.
		 * Null means unlimited.
		 */
		maximumDownloads: {
			type: Number,
			min: 1,
			default: null,
		},

		/**
		 * Number of minutes after access is granted before the download
		 * access expires.
		 *
		 * Null means no expiration.
		 */
		expirationMinutes: {
			type: Number,
			min: 0,
			default: null,
		},

		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		updatedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

offeringDownloadSchema.index(
	{
		business: 1,
		offering: 1,
	},
	{
		unique: true,
	},
);

export const OfferingDownload =
	mongoose.models.OfferingDownload ||
	mongoose.model("OfferingDownload", offeringDownloadSchema);

export default OfferingDownload;
