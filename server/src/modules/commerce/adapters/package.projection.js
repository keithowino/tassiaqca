import { packageRepository } from "../repositories/index.js";

import { projectionContract } from "../../offering/projections/index.js";

function mapOfferingToPackage(offering, actor) {
	return {
		business: offering.business,

		offering: offering.id,

		createdBy: actor.id,

		updatedBy: actor.id,
	};
}

async function create(context) {
	const { offering, actor } = context;

	return packageRepository.create(mapOfferingToPackage(offering, actor));
}

async function find(offeringId) {
	return packageRepository.findByOffering(offeringId);
}

async function update(context) {
	const { pkg, actor } = context;

	if (!pkg) {
		return null;
	}

	pkg.updatedBy = actor.id;

	return packageRepository.save(pkg);
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
