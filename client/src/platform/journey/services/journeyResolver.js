import { PlatformIntents } from "../constants/index.js";

/**
 * Initially keep it simple:
 */
export function resolveJourney(intent) {
	switch (intent) {
		case PlatformIntents.intent.MARKETPLACE:
			return "/marketplace";

		case PlatformIntents.intent.START_BUSINESS:
			return "/business/hub";

		case PlatformIntents.intent.JOIN_BUSINESS:
			return "/business/join";

		case PlatformIntents.intent.ADMINISTRATION:
			return "/admin";

		default:
			return "/";
	}
}
