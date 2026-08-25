import OfferingMembership from "../models/membership.model.js";

async function create(data) {
	return OfferingMembership.create(data);
}

async function save(membership) {
	return membership.save();
}

async function findByBusinessAndOffering(businessId, offeringId) {
	return OfferingMembership.findOne({
		business: businessId,
		offering: offeringId,
	});
}

export const membershipRepository = {
	create,
	save,
	findByBusinessAndOffering,
};

export default membershipRepository;
