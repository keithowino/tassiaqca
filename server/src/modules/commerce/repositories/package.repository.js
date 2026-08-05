import { Package } from "../models/index.js";

const OFFERING_POPULATE = {
	path: "offering",
};

const create = (payload) => Package.create(payload);

const findByOffering = (offeringId) =>
	Package.findOne({
		offering: offeringId,
	}).populate(OFFERING_POPULATE);

const save = (pkg) => pkg.save();

export default {
	create,
	findByOffering,
	save,
};
