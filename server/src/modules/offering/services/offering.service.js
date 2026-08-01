import lifecycleFactory from "../lifecycles/lifecycle.factory.js";
import { offeringRepository } from "../repositories/index.js";

/**
 * Delegation layer
 */

/**
|--------------------------------------------------
| Private helper functions
|--------------------------------------------------
*/

function lifecycleFor(payload) {
	return lifecycleFactory.resolveLifecycle(payload.data.type);
}

async function resolveExistingLifecycle({ businessId, offeringId }) {
	const offering = await offeringRepository.findByBusinessAndId(
		businessId,
		offeringId,
	);

	if (!offering) {
		return lifecycleFactory.resolveLifecycle("UNKNOWN");
	}

	return lifecycleFactory.resolveLifecycle(offering.type);
}

/**
|--------------------------------------------------
| Public functions
|--------------------------------------------------
*/

/**
 * The fallback to "PRODUCT" is only a transitional mechanism. For get, update, archive, and restore, the service does not yet know the offering type because it only receives an offeringId. In the next refinement, the resolver should determine the lifecycle by first loading the offering from the repository:
 */

// async function createOffering(payload) {
// 	const lifecycle = lifecycleRegistry.resolveLifecycle(payload.data.type);

// 	return lifecycle.create(payload);
// }

async function createOffering(payload) {
	return lifecycleFor(payload).create(payload);
}

// async function listOfferings(payload) {
// 	const lifecycle = lifecycleRegistry.resolveLifecycle(
// 		payload.query?.type ?? payload.type ?? "PRODUCT",
// 	);

// 	return lifecycle.list(payload);
// }

async function listOfferings(payload) {
	// shared for now
	return lifecycleFactory
		.resolveLifecycle(payload.query?.type ?? "PRODUCT")
		.list(payload);
}

// async function getOffering(payload) {
// 	// Placeholder until entity-based resolution is introduced.
// 	const lifecycle = lifecycleRegistry.resolveLifecycle(
// 		payload.type ?? "PRODUCT",
// 	);

// 	return lifecycle.get(payload);
// }

async function getOffering(payload) {
	const lifecycle = await resolveExistingLifecycle(payload);

	return lifecycle.get(payload);
}

// async function updateOffering(payload) {
// 	const lifecycle = lifecycleRegistry.resolveLifecycle(
// 		payload.data?.type ?? payload.type ?? "PRODUCT",
// 	);

// 	return lifecycle.update(payload);
// }

async function updateOffering(payload) {
	const lifecycle = await resolveExistingLifecycle(payload);

	return lifecycle.update(payload);
}

// async function archiveOffering(payload) {
// 	const lifecycle = lifecycleRegistry.resolveLifecycle(
// 		payload.type ?? "PRODUCT",
// 	);

// 	return lifecycle.archive(payload);
// }

async function archiveOffering(payload) {
	const lifecycle = await resolveExistingLifecycle(payload);

	return lifecycle.archive(payload);
}

// async function restoreOffering(payload) {
// 	const lifecycle = lifecycleRegistry.resolveLifecycle(
// 		payload.type ?? "PRODUCT",
// 	);

// 	return lifecycle.restore(payload);
// }

async function restoreOffering(payload) {
	const lifecycle = await resolveExistingLifecycle(payload);

	return lifecycle.restore(payload);
}

export default {
	createOffering,
	listOfferings,
	getOffering,
	updateOffering,
	archiveOffering,
	restoreOffering,
};
