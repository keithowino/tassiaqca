import { Event } from "../models/index.js";

const OFFERING_POPULATE = {
	path: "offering",
};

const create = (payload) => {
	return Event.create(payload);
};

const findById = (id) => {
	return Event.findById(id).populate(OFFERING_POPULATE);
};

const findByOffering = (offeringId) => {
	return Event.findOne({
		offering: offeringId,
	}).populate(OFFERING_POPULATE);
};

const save = (event) => {
	return event.save();
};

export default {
	create,

	findById,

	findByOffering,

	save,
};
