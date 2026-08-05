import { membershipRepository } from "../repositories/index.js";

import { projectionContract } from "../../offering/projections/index.js";

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function mapOfferingToMembership(offering, actor) {
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

	return membershipRepository.create(
		mapOfferingToMembership(offering, actor),
	);
}

async function find(offeringId) {
	return membershipRepository.findByOffering(offeringId);
}

async function update(context) {
	const { membership, actor } = context;

	if (!membership) {
		return null;
	}

	membership.updatedBy = actor.id;

	return membershipRepository.save(membership);
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
