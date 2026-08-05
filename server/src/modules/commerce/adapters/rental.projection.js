import { rentalRepository } from "../repositories/index.js";

import { projectionContract } from "../../offering/projections/index.js";

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function mapOfferingToRental(offering, actor) {
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

	return rentalRepository.create(mapOfferingToRental(offering, actor));
}

async function find(offeringId) {
	return rentalRepository.findByOffering(offeringId);
}

async function update(context) {
	const { rental, actor } = context;

	if (!rental) {
		return null;
	}

	rental.updatedBy = actor.id;

	return rentalRepository.save(rental);
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
