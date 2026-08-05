import { HTTP_STATUS } from "../../constants/index.js";
import { AppError, ErrorCodes } from "../../errors/index.js";
import {
	exists,
	filterBy,
	findBy,
	getAll,
	getById,
	groupBy,
} from "./registry.utils.js";

/**
 * Registry-driven architecture now exists:
 *
 * - Business Types
 * - Modules
 * - Capabilities
 * - builder
 * - Offering lifecycle
 * - configuration
 * - projection
 */
export const createRegistry = (items, keySelector = (item) => item.id) => {
	const registry = new Map();

	for (const item of items) {
		const key = keySelector(item);

		if (registry.has(key)) {
			throw new AppError(
				`Duplicate registry key "${key}".`,
				HTTP_STATUS.CONFLICT,
				ErrorCodes.CONFLICT,
			);
		}

		registry.set(key, Object.freeze(item));
	}

	Object.freeze(items);

	return Object.freeze({
		get: (id) => getById(registry, id),

		getAll: () => getAll(registry),

		exists: (id) => exists(registry, id),

		find: (predicate) => findBy(registry, predicate),

		filter: (predicate) => filterBy(registry, predicate),

		groupBy: (selector) => groupBy(registry, selector),
	});
};
