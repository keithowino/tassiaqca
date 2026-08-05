import { Membership } from "../models/index.js";

const OFFERING_POPULATE = {
	path: "offering",
};

const create = (payload) => {
	return Membership.create(payload);
};

const findById = (id) => {
	return Membership.findById(id).populate(OFFERING_POPULATE);
};

const findByOffering = (offeringId) => {
	return Membership.findOne({
		offering: offeringId,
	}).populate(OFFERING_POPULATE);
};

const save = (membership) => {
	return membership.save();
};

export default {
	create,

	findById,

	findByOffering,

	save,
};
