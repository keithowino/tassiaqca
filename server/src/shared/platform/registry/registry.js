import {
	exists,
	filterBy,
	findBy,
	getAll,
	getById,
	groupBy,
} from "./registry.utils.js";

export const createRegistry = (items, keySelector = (item) => item.id) => {
	const registry = new Map();

	for (const item of items) {
		const key = keySelector(item);

		if (registry.has(key)) {
			throw new Error(`Duplicate registry key "${key}".`);
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
