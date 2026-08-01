import offeringRegistry from "../../../shared/platform/offerings/offering.registry.js";

/**
 * Its sole responsibility is to resolve the correct builder for an offering type and delegate construction.
 */

function resolveBuilder(type) {
	const definition = offeringRegistry.get(type);

	if (!definition) {
		throw new Error(`Unknown offering type "${type}".`);
	}

	return definition.builder;
}

function createOffering(payload) {
	return resolveBuilder(payload.data.type)(payload);
}

export default {
	createOffering,
};
