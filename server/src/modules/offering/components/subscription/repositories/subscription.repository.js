import OfferingSubscription from "../models/subscription.model.js";

async function create(data) {
	return OfferingSubscription.create(data);
}

async function save(subscription) {
	return subscription.save();
}

async function findByBusinessAndOffering(businessId, offeringId) {
	return OfferingSubscription.findOne({
		business: businessId,
		offering: offeringId,
	});
}

export const subscriptionRepository = {
	create,
	save,
	findByBusinessAndOffering,
};

export default subscriptionRepository;
