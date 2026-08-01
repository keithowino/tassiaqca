/**
|--------------------------------------------------
| Heart of the identity domain
|--------------------------------------------------
*/
import mongoose from "mongoose";

const businessMemberSchema = new mongoose.Schema(
	{
		business: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Business",
			required: true,
			index: true,
		},

		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			index: true,
		},

		role: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Role",
			required: true,
		},

		joinedAt: {
			type: Date,
			default: Date.now,
		},

		active: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	},
);

businessMemberSchema.index(
	{
		business: 1,
		user: 1,
	},
	{
		unique: true,
	},
);

export default mongoose.model("BusinessMember", businessMemberSchema);
