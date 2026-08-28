import { AppError, ErrorCodes, HTTP_STATUS } from "../../index.js";
import { offeringRegistry } from "./offering.registry.js";

export function offeringSupportsComponent(offering, componentId) {
	const registration = offeringRegistry.get(offering.type);

	/**
	 * Previous version
	 *
	 * if (!registration) { return false; }
	 *
	 * return registration.components?.includes(componentId) ?? false;
	 */
	return Boolean(
		registration &&
		Array.isArray(registration.components) &&
		registration.components.includes(componentId),
	);
}

/**
 * Generic enforcement helper
 */
export function ensureOfferingSupportsComponent(
	offering,
	componentId,
	message = "This component is not supported by this offering.",
) {
	if (!offeringSupportsComponent(offering, componentId)) {
		throw new AppError(
			message,
			HTTP_STATUS.BAD_REQUEST,
			ErrorCodes.BAD_REQUEST,
		);
	}

	return offering;
}
