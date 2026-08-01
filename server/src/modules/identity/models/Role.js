/**
|--------------------------------------------------
| Collection of permissions
|--------------------------------------------------
*/
import mongoose from "mongoose";
import "./Permission.js";

const roleSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},

		slug: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},

		description: String,

		permissions: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Permission",
			},
		],

		system: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("Role", roleSchema);
