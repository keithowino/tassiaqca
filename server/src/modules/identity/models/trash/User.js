import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
		},

		lastName: {
			type: String,
			trim: true,
		},

		email: {
			type: String,
			unique: true,
			required: true,
			lowercase: true,
			trim: true,
		},

		phone: {
			type: String,
			trim: true,
		},

		password: {
			type: String,
			required: true,
			minlength: 6,
		},

		avatar: {
			url: String,
			publicId: String,
		},

		emailVerified: {
			type: Boolean,
			default: false,
		},

		active: {
			type: Boolean,
			default: true,
		},

		refreshToken: {
			type: String,
			default: null,
			select: false,
		},

		tokenVersion: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("User", userSchema);
