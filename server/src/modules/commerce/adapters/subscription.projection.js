import subscriptionRepository from "../repositories/subscription.repository.js";

import { projectionContract } from "../../offering/projections/index.js";

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function mapOfferingToSubscription(offering, actor) {
	return {
		business: offering.business,

		offering: offering.id,

		createdBy: actor.id,

		updatedBy: actor.id,
	};
}

/*
|--------------------------------------------------------------------------
| Projection
|--------------------------------------------------------------------------
*/

async function create(context) {
	const { offering, actor } = context;

	return subscriptionRepository.create(
		mapOfferingToSubscription(offering, actor),
	);
}

async function find(offeringId) {
	return subscriptionRepository.findByOffering(offeringId);
}

async function update(context) {
	const { subscription, actor } = context;

	if (!subscription) {
		return null;
	}

	subscription.updatedBy = actor.id;

	return subscriptionRepository.save(subscription);
}

async function archive() {
	return null;
}

async function restore() {
	return null;
}

export default {
	...projectionContract,

	find,

	create,

	update,

	archive,

	restore,
};
