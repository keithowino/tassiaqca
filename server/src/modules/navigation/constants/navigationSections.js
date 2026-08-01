export const NAVIGATION_SECTIONS = Object.freeze({
	WORKSPACE: {
		id: "workspace",
		label: "Workspace",
		order: 0,
	},

	BUSINESS: {
		id: "business",
		label: "Business",
		order: 10,
	},

	GROWTH: {
		id: "growth",
		label: "Growth",
		order: 20,
	},

	SYSTEM: {
		id: "system",
		label: "System",
		order: 30,
	},
});

export const getNavigationSection = (id) =>
	Object.values(NAVIGATION_SECTIONS).find((section) => section.id === id);
