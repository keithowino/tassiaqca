import Subscription from "../models/Subscription.js";

const OFFERING_POPULATE = {
	path: "offering",
};

const create = (payload) => {
	return Subscription.create(payload);
};

const findById = (id) => {
	return Subscription.findById(id).populate(OFFERING_POPULATE);
};

const findByOffering = (offeringId) => {
	return Subscription.findOne({
		offering: offeringId,
	}).populate(OFFERING_POPULATE);
};

const save = (subscription) => {
	return subscription.save();
};

export default {
	create,

	findById,

	findByOffering,

	save,
};
