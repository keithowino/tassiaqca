import lifecycleFactory from "../lifecycles/lifecycle.factory.js";
import { offeringRepository } from "../repositories/index.js";
import { offeringRegistry } from "../../../shared/platform/offerings/index.js";

/**
 * Delegation layer
 */

/**
|--------------------------------------------------
| Private helper functions
|--------------------------------------------------
*/

function registrationFor(type) {
	const registration = offeringRegistry.get(type);

	if (!registration) {
		return {
			lifecycle: lifecycleFactory.resolveLifecycle("UNKNOWN"),
		};
	}

	return registration;
}

async function resolveExistingRegistration({ businessId, offeringId }) {
	const offering = await offeringRepository.findByBusinessAndId(
		businessId,
		offeringId,
	);

	if (!offering) {
		return {
			lifecycle: lifecycleFactory.resolveLifecycle("UNKNOWN"),
		};
	}

	return registrationFor(offering.type);
}

/**
|--------------------------------------------------
| Public functions
|--------------------------------------------------
*/

/**
 * The fallback to "PRODUCT" is only a transitional mechanism. For get, update, archive, and restore, the service does not yet know the offering type because it only receives an offeringId. In the next refinement, the resolver should determine the lifecycle by first loading the offering from the repository:
 */

async function createOffering(payload) {
	const registration = registrationFor(payload.data.type);

	return registration.lifecycle.create({
		...payload,
		registration,
	});
}

async function updateOffering(payload) {
	const registration = await resolveExistingRegistration(payload);

	return registration.lifecycle.update({
		...payload,
		registration,
	});
}

async function listOfferings(payload) {
	/**
	 * For now you can also do.
	 *
	 * Although list() doesn't use it yet.
	 */
	const registration = registrationFor(payload.query?.type ?? "PRODUCT");

	return registration.lifecycle.list({
		...payload,
		registration,
	});
}

async function getOffering(payload) {
	const registration = await resolveExistingRegistration(payload);

	return registration.lifecycle.get({
		...payload,
		registration,
	});
}

async function archiveOffering(payload) {
	const registration = await resolveExistingRegistration(payload);

	return registration.lifecycle.archive({
		...payload,
		registration,
	});
}

async function restoreOffering(payload) {
	const registration = await resolveExistingRegistration(payload);

	return registration.lifecycle.restore({
		...payload,
		registration,
	});
}

export default {
	createOffering,
	listOfferings,
	getOffering,
	updateOffering,
	archiveOffering,
	restoreOffering,
};
