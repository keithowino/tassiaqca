import { HTTP_STATUS } from "../../../shared/constants/index.js";
import { AppError, ErrorCodes } from "../../../shared/errors/index.js";
import offeringRegistry from "../../../shared/platform/offerings/offering.registry.js";

/**
 * Its sole responsibility is to resolve the correct builder for an offering type and delegate construction.
 */

function resolveBuilder(type) {
	const definition = offeringRegistry.get(type);

	// if (!definition) {
	// 	throw new Error(`Unknown offering type "${type}".`);
	// }

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
