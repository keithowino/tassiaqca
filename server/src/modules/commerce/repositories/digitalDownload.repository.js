import { DigitalDownload } from "../models/index.js";

const OFFERING_POPULATE = {
	path: "offering",
};

const create = (payload) => {
	return DigitalDownload.create(payload);
};

const findByOffering = (offeringId) => {
	return DigitalDownload.findOne({
		offering: offeringId,
	}).populate(OFFERING_POPULATE);
};

const save = (digitalDownload) => {
	return digitalDownload.save();
};

export default {
	create,
	findByOffering,
	save,
};
