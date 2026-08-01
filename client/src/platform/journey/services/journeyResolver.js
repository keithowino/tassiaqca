import { PlatformIntent } from "../constants/platformIntents";

/**
 * Initially keep it simple:
 */
export function resolveJourney(intent) {
	switch (intent) {
		case PlatformIntent.MARKETPLACE:
			return "/marketplace";

		case PlatformIntent.START_BUSINESS:
			return "/business/hub";

		case PlatformIntent.JOIN_BUSINESS:
			return "/business/join";

		case PlatformIntent.ADMINISTRATION:
			return "/admin";

		default:
			return "/";
	}
}
