export const buildDashboard = (modules = []) =>
	modules
		.flatMap((module) => {
			const widgets = module.metadata?.ui?.widgets ?? [];

			return widgets.map((widget) => ({
				moduleId: module.id,

				moduleName: module.name,

				...widget,
			}));
		})
		.sort((left, right) => left.order - right.order);
