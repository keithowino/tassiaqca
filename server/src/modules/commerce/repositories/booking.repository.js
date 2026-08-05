import { Booking } from "../models/index.js";

const OFFERING_POPULATE = {
	path: "offering",
};

const create = (payload) => {
	return Booking.create(payload);
};

const findByOffering = (offeringId) => {
	return Booking.findOne({
		offering: offeringId,
	}).populate(OFFERING_POPULATE);
};

const save = (booking) => {
	return booking.save();
};

export default {
	create,
	findByOffering,
	save,
};
