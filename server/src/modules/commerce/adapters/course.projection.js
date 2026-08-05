import { courseRepository } from "../repositories/index.js";

import { projectionContract } from "../../offering/projections/index.js";

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function mapOfferingToCourse(offering, actor) {
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

	return courseRepository.create(mapOfferingToCourse(offering, actor));
}

async function find(offeringId) {
	return courseRepository.findByOffering(offeringId);
}

async function update(context) {
	const { course, actor } = context;

	if (!course) {
		return null;
	}

	course.updatedBy = actor.id;

	return courseRepository.save(course);
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
