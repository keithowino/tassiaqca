// import mongoose from "mongoose";

// import { OFFERING_STATUS, OFFERING_VISIBILITY } from "../constants/index.js";

// import { OFFERING_TYPES } from "../../../shared/platform/offerings/index.js";

// const offeringSchema = new mongoose.Schema(
// 	{
// 		business: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: "Business",
// 			required: true,
// 			index: true,
// 		},

// 		type: {
// 			type: String,
// 			required: true,
// 			enum: Object.values(OFFERING_TYPES),
// 			index: true,
// 		},

// 		slug: {
// 			type: String,
// 			required: true,
// 			trim: true,
// 			lowercase: true,
// 			index: true,
// 		},

// 		name: {
// 			type: String,
// 			required: true,
// 			trim: true,
// 		},

// 		shortDescription: {
// 			type: String,
// 			trim: true,
// 			default: "",
// 		},

// 		description: {
// 			type: String,
// 			default: "",
// 		},

// 		status: {
// 			type: String,
// 			enum: Object.values(OFFERING_STATUS),
// 			default: OFFERING_STATUS.DRAFT,
// 			index: true,
// 		},

// 		visibility: {
// 			type: String,
// 			enum: Object.values(OFFERING_VISIBILITY),
// 			default: OFFERING_VISIBILITY.PRIVATE,
// 		},

// 		searchable: {
// 			type: Boolean,
// 			default: true,
// 		},

// 		featured: {
// 			type: Boolean,
// 			default: false,
// 		},

// 		publishedAt: Date,

// 		metadata: {
// 			type: mongoose.Schema.Types.Mixed,
// 			default: {},
// 		},

// 		createdBy: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: "User",
// 		},

// 		updatedBy: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: "User",
// 		},
// 	},
// 	{
// 		timestamps: true,
// 	},
// );

// offeringSchema.index({
// 	business: 1,
// 	slug: 1,
// });

// export const Offering =
// 	mongoose.models.Offering || mongoose.model("Offering", offeringSchema);

// ...

import mongoose from "mongoose";

import { OFFERING_STATUS, OFFERING_VISIBILITY } from "../constants/index.js";

import { OFFERING_TYPES } from "../../../shared/platform/offerings/index.js";

const offeringSchema = new mongoose.Schema(
	{
		business: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Business",
			required: true,
			index: true,
		},

		type: {
			type: String,
			required: true,
			enum: Object.values(OFFERING_TYPES),
			index: true,
		},

		slug: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			index: true,
		},

		name: {
			type: String,
			required: true,
			trim: true,
		},

		shortDescription: {
			type: String,
			trim: true,
			default: "",
		},

		description: {
			type: String,
			default: "",
		},

		status: {
			type: String,
			enum: Object.values(OFFERING_STATUS),
			default: OFFERING_STATUS.DRAFT,
			index: true,
		},

		visibility: {
			type: String,
			enum: Object.values(OFFERING_VISIBILITY),
			default: OFFERING_VISIBILITY.PRIVATE,
		},

		searchable: {
			type: Boolean,
			default: true,
		},

		featured: {
			type: Boolean,
			default: false,
		},

		publishedAt: Date,

		categories: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Category",
				},
			],
			default: [],
		},

		tags: {
			type: [String],
			default: [],
		},

		media: {
			type: [
				{
					assetId: {
						type: String,
						required: true,
					},

					type: {
						type: String,
						enum: ["IMAGE", "VIDEO", "DOCUMENT", "AUDIO"],
						required: true,
					},

					url: {
						type: String,
						required: true,
					},

					alt: {
						type: String,
						default: "",
					},

					title: {
						type: String,
						default: "",
					},

					position: {
						type: Number,
						default: 0,
						min: 0,
					},

					featured: {
						type: Boolean,
						default: false,
					},

					metadata: {
						type: mongoose.Schema.Types.Mixed,
						default: {},
					},
				},
			],
			default: [],
		},

		seo: {
			title: {
				type: String,
				default: "",
				trim: true,
				maxlength: 200,
			},

			description: {
				type: String,
				default: "",
				trim: true,
				maxlength: 320,
			},

			keywords: {
				type: [String],
				default: [],
			},

			canonicalUrl: {
				type: String,
				default: "",
				trim: true,
			},

			ogImage: {
				type: String,
				default: "",
				trim: true,
			},
		},

		metadata: {
			type: mongoose.Schema.Types.Mixed,
			default: {},
		},

		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},

		updatedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
	},
);

offeringSchema.index({
	business: 1,
	slug: 1,
});

export const Offering =
	mongoose.models.Offering || mongoose.model("Offering", offeringSchema);
