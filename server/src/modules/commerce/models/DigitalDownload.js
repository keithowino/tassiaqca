import mongoose from "mongoose";

const digitalDownloadSchema = new mongoose.Schema(
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
			unique: true,
			index: true,
		},

		/**
		 * Digital Download-specific fields
		 */

		fileUrl: {
			type: String,
			default: "",
		},

		fileName: {
			type: String,
			default: "",
		},

		fileSize: {
			type: Number,
			default: 0,
		},

		mimeType: {
			type: String,
			default: "",
		},

		version: {
			type: String,
			default: "",
		},

		downloadLimit: {
			type: Number,
			default: null,
		},

		expiresAt: {
			type: Date,
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
	},
);

export default mongoose.model("DigitalDownload", digitalDownloadSchema);
