import mongoose from "mongoose";

const mealDetailsSchema = new mongoose.Schema({
	offering: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Offering",
		unique: true,
	},

	preparationMinutes: Number,

	price: Number,

	availableToday: Boolean,

	spicyLevel: Number,
});

export default mongoose.model("MealDetails", mealDetailsSchema);
