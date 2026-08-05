import { eventRepository } from "../repositories/index.js";

import { projectionContract } from "../../offering/projections/index.js";

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function mapOfferingToEvent(offering, actor) {
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

	return eventRepository.create(mapOfferingToEvent(offering, actor));
}

async function find(offeringId) {
	return eventRepository.findByOffering(offeringId);
}

async function update(context) {
	const { event, actor } = context;

	if (!event) {
		return null;
	}

	event.updatedBy = actor.id;

	return eventRepository.save(event);
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
