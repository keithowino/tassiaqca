import { projectionContract } from "../../offering/projections/index.js";

import { serviceRepository } from "../repositories/index.js";

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function mapOfferingToService(offering, actor) {
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

	return serviceRepository.create(mapOfferingToService(offering, actor));
}

async function find(offeringId) {
	return serviceRepository.findByOffering(offeringId);
}

async function update(context) {
	const { service, actor } = context;

	if (!service) {
		return null;
	}

	service.updatedBy = actor.id;

	return serviceRepository.save(service);
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
