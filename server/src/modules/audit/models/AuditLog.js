import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
	{
		business: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Business",
			required: true,
			index: true,
		},

		entityType: {
			type: String,
			required: true,
			index: true,
		},

		entityId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			index: true,
		},

		action: {
			type: String,
			required: true,
			index: true,
		},

		actor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			index: true,
		},

		metadata: {
			type: mongoose.Schema.Types.Mixed,
			default: {},
		},

		ipAddress: {
			type: String,
			default: null,
		},

		userAgent: {
			type: String,
			default: null,
		},
	},
	{
		timestamps: {
			createdAt: true,
			updatedAt: false,
		},
	},
);

export default mongoose.model("AuditLog", auditLogSchema);
