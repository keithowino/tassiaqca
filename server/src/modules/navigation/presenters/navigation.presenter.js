import { getNavigationSection } from "../constants/index.js";

export const presentNavigation = (navigation) => {
	const sections = new Map();

	let defaultNavigationId = null;

	let defaultRoute = null;

	for (const item of navigation) {
		if (item.default) {
			defaultNavigationId = item.id;

			defaultRoute = item.route;
		}

		if (!sections.has(item.section)) {
			const metadata = getNavigationSection(item.section);

			sections.set(item.section, {
				id: metadata?.id ?? item.section,

				label: metadata?.label ?? item.section,

				order: metadata?.order ?? 999,

				items: [],
			});
		}

		sections.get(item.section).items.push(item);
	}

	return {
		version: 1,

		defaultNavigationId,

		defaultRoute,

		sections: [...sections.values()].sort(
			(left, right) => left.order - right.order,
		),
	};
};
