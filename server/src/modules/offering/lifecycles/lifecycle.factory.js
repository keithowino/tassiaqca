import {
	AppError,
	ErrorCodes,
	HTTP_STATUS,
	offeringRegistry,
} from "../../../shared/index.js";

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
		throw new AppError(
			`Unknown offering type "${type}".`,
			HTTP_STATUS.NOT_FOUND,
			ErrorCodes.NOT_FOUND,
		);
	}

	if (!definition.lifecycle) {
		throw new AppError(
			`No lifecycle registered for offering type "${type}".`,
			HTTP_STATUS.NOT_FOUND,
			ErrorCodes.NOT_FOUND,
		);
	}

	return definition.lifecycle;
}

export default {
	resolveLifecycle,
};
