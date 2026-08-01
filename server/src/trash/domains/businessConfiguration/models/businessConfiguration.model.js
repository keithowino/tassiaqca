import mongoose from "mongoose";

const moduleStateSchema = new mongoose.Schema(
	{
		id: {
			type: String,
			required: true,
		},

		enabled: {
			type: Boolean,
			default: true,
		},

		settings: {
			type: Map,
			of: mongoose.Schema.Types.Mixed,
			default: {},
		},
	},
	{ _id: false },
);

const capabilityStateSchema = new mongoose.Schema(
	{
		id: {
			type: String,
			required: true,
		},

		enabled: {
			type: Boolean,
			default: true,
		},

		settings: {
			type: Map,
			of: mongoose.Schema.Types.Mixed,
			default: {},
		},
	},
	{ _id: false },
);

const businessConfigurationSchema = new mongoose.Schema(
	{
		business: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Business",
			required: true,
			unique: true,
			index: true,
		},

		businessType: {
			type: String,
			required: true,
		},

		modules: {
			type: [moduleStateSchema],
			default: [],
		},

		capabilities: {
			type: [capabilityStateSchema],
			default: [],
		},

		featureFlags: {
			type: Map,
			of: Boolean,
			default: {},
		},

		metadata: {
			type: Map,
			of: mongoose.Schema.Types.Mixed,
			default: {},
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

export const BusinessConfiguration = mongoose.model(
	"BusinessConfiguration",
	businessConfigurationSchema,
);
