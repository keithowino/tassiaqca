import { Service } from "../models/index.js";

const OFFERING_POPULATE = {
	path: "offering",
};

async function create(payload) {
	return Service.create(payload);
}

async function findById(id) {
	return Service.findById(id).populate(OFFERING_POPULATE);
}

async function findByOffering(offeringId) {
	return Service.findOne({
		offering: offeringId,
	}).populate(OFFERING_POPULATE);
}

async function findByOfferingAndBusiness(businessId, offeringId) {
	return Service.findOne({
		business: businessId,
		offering: offeringId,
	}).populate(OFFERING_POPULATE);
}

async function save(service) {
	return service.save();
}

export default {
	create,

	findById,

	findByOffering,
	findByOfferingAndBusiness,

	save,
};
