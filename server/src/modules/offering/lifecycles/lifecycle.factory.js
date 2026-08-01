import offeringRegistry from "../../../shared/platform/offerings/offering.registry.js";

/**
 * Resolves the lifecycle registered for an offering type.
 *
 * The lifecycle comes directly from the platform registry,
 * allowing new offering types to plug themselves into
 * the platform without modifying the service layer.
 */

function resolveLifecycle(type) {
	const definition = offeringRegistry.get(type);

	if (!definition) {
		throw new Error(`Unknown offering type "${type}".`);
	}

	if (!definition.lifecycle) {
		throw new Error(`No lifecycle registered for offering type "${type}".`);
	}

	return definition.lifecycle;
}

export default {
	resolveLifecycle,
};
