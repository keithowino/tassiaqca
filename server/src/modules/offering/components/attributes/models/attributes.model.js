import mongoose from "mongoose";

const attributesSchema = new mongoose.Schema(
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
			// index: true,
		},

		name: {
			type: String,
			required: true,
			trim: true,
			maxlength: 100,
		},

		values: {
			type: [String],
			required: true,
			validate: {
				validator(values) {
					return values.length >= 1 && values.length <= 100;
				},
				message: "An attribute must contain between 1 and 100 values.",
			},
		},

		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		updatedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			default: null,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

attributesSchema.index({
	offering: 1,
});

attributesSchema.index(
	{
		offering: 1,
		name: 1,
	},
	{
		unique: true,
		collation: {
			locale: "en",
			strength: 2,
		},
	},
);

export const OfferingAttribute =
	mongoose.models.OfferingAttribute ||
	mongoose.model("OfferingAttribute", attributesSchema);

export default OfferingAttribute;
