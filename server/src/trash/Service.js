import mongoose from "mongoose";

const serviceDetailsSchema = new mongoose.Schema({
	offering: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Offering",
		unique: true,
	},

	durationMinutes: Number,

	startingPrice: Number,

	mobileService: Boolean,

	requiresBooking: Boolean,
});

export default mongoose.model("ServiceDetails", serviceDetailsSchema);
