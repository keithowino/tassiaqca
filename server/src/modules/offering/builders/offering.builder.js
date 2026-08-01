import offeringRegistry from "../../../shared/platform/offerings/offering.registry.js";

export function buildOffering({ businessId, data, slug, actor }) {
	const definition = offeringRegistry.get(data.type);

	if (!definition) {
		throw new Error(`Unknown offering type "${data.type}".`);
	}

	const defaults = definition.defaults;

	return {
		business: businessId,

		type: definition.type,

		slug,

		name: data.name.trim(),

		shortDescription: data.shortDescription ?? "",

		description: data.description ?? "",

		status: data.status ?? defaults.status,

		visibility: data.visibility ?? defaults.visibility,

		searchable: data.searchable ?? defaults.searchable,

		featured: data.featured ?? defaults.featured,

		metadata: {
			...defaults.metadata,
			...(data.metadata ?? {}),
		},

		createdBy: actor.id,

		updatedBy: actor.id,
	};
}
