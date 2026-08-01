class WidgetRegistry {
	constructor() {
		this.widgets = new Map();
	}

	register(type, component) {
		this.widgets.set(type.toLowerCase(), component);
	}

	resolve(type) {
		return this.widgets.get(type.toLowerCase()) ?? null;
	}
}

const widgetRegistry = new WidgetRegistry();

export default widgetRegistry;
