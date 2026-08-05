import mongoose from "mongoose";

/**
 * Course Projection
 *
 * Stores only Course-specific information.
 *
 * Shared information lives in the Offering aggregate.
 */
const courseSchema = new mongoose.Schema(
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
		 * Course-specific fields.
		 *
		 * Future examples:
		 *
		 * - instructor
		 * - deliveryMode
		 * - duration
		 * - difficultyLevel
		 * - prerequisites
		 * - certificateEnabled
		 * - lessonStructure
		 * - enrollmentLimit
		 */

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

export default mongoose.model("Course", courseSchema);
