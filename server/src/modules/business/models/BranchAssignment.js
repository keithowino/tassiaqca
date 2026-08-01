import mongoose from "mongoose";

const branchAssignmentSchema = new mongoose.Schema(
	{
		businessMember: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "BusinessMember",
			required: true,
			index: true,
		},

		branch: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Branch",
			required: true,
			index: true,
		},

		assignedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		primary: {
			type: Boolean,
			default: false,
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

/**
 * A member may only have one active assignment
 * to a particular branch.
 */
branchAssignmentSchema.index(
	{
		businessMember: 1,
		branch: 1,
	},
	{
		unique: true,
	},
);

export default mongoose.model("BranchAssignment", branchAssignmentSchema);
