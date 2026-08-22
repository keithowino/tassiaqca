import { AppError, ErrorCodes, HTTP_STATUS } from "../../index.js";
import { offeringRegistry } from "./offering.registry.js";

// export function offeringSupportsComponent(offering, componentId) {
// 	const registration = offeringRegistry.get(offering.type);

// 	if (!registration) {
// 		return false;
// 	}

// 	return registration.components?.includes(componentId) ?? false;
// }

export function offeringSupportsComponent(offering, componentId) {
	const registration = offeringRegistry.get(offering.type);

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

/**
 * How to use `ensureOfferingSupportsComponent` in the components services
 */
// await ensureOfferingSupportsComponent(
//     offering,
//     OFFERING_COMPONENTS.DURATION,
//     "Duration is not supported for this offering.",
// );
