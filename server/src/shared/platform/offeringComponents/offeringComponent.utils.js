import { offeringComponentRegistry } from "./offeringComponent.registry.js";

export function resolveComponents(registration) {
	return (registration.components ?? [])
		.map((id) => offeringComponentRegistry.get(id))
		.filter(Boolean)
		.map((component) => component.implementation);
}
