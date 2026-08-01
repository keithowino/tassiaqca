export const getById = (registry, id) => registry.get(id);

export const getAll = (registry) => [...registry.values()];

export const exists = (registry, id) => registry.has(id);

export const filterBy = (registry, predicate) =>
	getAll(registry).filter(predicate);

export const findBy = (registry, predicate) => getAll(registry).find(predicate);

export const groupBy = (registry, selector) => {
	return getAll(registry).reduce((groups, item) => {
		const key = selector(item);

		if (!groups[key]) {
			groups[key] = [];
		}

		groups[key].push(item);

		return groups;
	}, {});
};
