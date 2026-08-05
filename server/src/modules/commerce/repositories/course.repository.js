import { Course } from "../models/index.js";

const OFFERING_POPULATE = {
	path: "offering",
};

const create = (payload) => {
	return Course.create(payload);
};

const findById = (id) => {
	return Course.findById(id).populate(OFFERING_POPULATE);
};

const findByOffering = (offeringId) => {
	return Course.findOne({
		offering: offeringId,
	}).populate(OFFERING_POPULATE);
};

const save = (course) => {
	return course.save();
};

export default {
	create,

	findById,

	findByOffering,

	save,
};
