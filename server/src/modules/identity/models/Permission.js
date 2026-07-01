/**
|--------------------------------------------------
| Atomic actions
|--------------------------------------------------
*/
import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
	{
		key: {
			type: String,
			required: true,
			unique: true,
			uppercase: true,
			trim: true,
		},

		name: {
			type: String,
			required: true,
			trim: true,
		},

		description: {
			type: String,
			default: "",
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("Permission", permissionSchema);
