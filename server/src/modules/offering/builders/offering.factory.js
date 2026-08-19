import {
	AppError,
	ErrorCodes,
	HTTP_STATUS,
	offeringRegistry,
} from "../../../shared/index.js";

/**
 * Its sole responsibility is to resolve the correct builder for an offering type and delegate construction.
 */

function resolveBuilder(type) {
	const definition = offeringRegistry.get(type);

	if (!definition) {
		throw new AppError(
			`Unknown offering type "${type}".`,
			HTTP_STATUS.NOT_FOUND,
			ErrorCodes.NOT_FOUND,
		);
	}

	return definition.builder;
}

function createOffering(payload) {
	return resolveBuilder(payload.data.type)(payload);
}

export default {
	createOffering,
};
