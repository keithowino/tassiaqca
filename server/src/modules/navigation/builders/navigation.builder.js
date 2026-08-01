export const buildNavigationModel = (modules = []) =>
	modules
		.flatMap((module) => {
			const navigationEntries = module.metadata?.ui?.navigation ?? [];

			const routes = module.metadata?.ui?.routes ?? [];

			const routeMap = new Map(
				routes.map((route) => [route.name, route]),
			);

			return navigationEntries.map((entry) => ({
				moduleId: module.id,

				moduleName: module.name,

				route: routeMap.get(entry.id)?.path ?? null,

				...entry,
			}));
		})
		.sort((left, right) => left.order - right.order);
