import { RegistryValidationError } from "../../../modules/businessConfiguration/errors/index.js";

/**
 * Validates that every referenced identifier exists in the target registry.
 *
 * @param {Object} options
 * @param {Object} options.sourceRegistry
 * @param {Object} options.targetRegistry
 * @param {(item: any) => string[]} options.selector
 * @param {string} options.sourceName
 * @param {string} options.targetName
 */
export const validateReferences = ({
	sourceRegistry,
	targetRegistry,
	selector,
	sourceName,
	targetName,
}) => {
	for (const source of sourceRegistry.getAll()) {
		const references = selector(source) ?? [];

		for (const reference of references) {
			if (!targetRegistry.exists(reference)) {
				throw new RegistryValidationError(
					`${sourceName} "${source.id}" references unknown ${targetName} "${reference}".`,
				);
			}
		}
	}
};
