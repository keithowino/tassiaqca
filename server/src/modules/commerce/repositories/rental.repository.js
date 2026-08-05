import { Rental } from "../models/index.js";

const OFFERING_POPULATE = {
	path: "offering",
};

const create = (payload) => {
	return Rental.create(payload);
};

const findById = (id) => {
	return Rental.findById(id).populate(OFFERING_POPULATE);
};

const findByOffering = (offeringId) => {
	return Rental.findOne({
		offering: offeringId,
	}).populate(OFFERING_POPULATE);
};

const save = (rental) => {
	return rental.save();
};

export default {
	create,

	findById,

	findByOffering,

	save,
};
