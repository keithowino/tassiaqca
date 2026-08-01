import widgetRegistry from "../registry/widgetRegistry";

import UnknownWidget from "../widgets/UnknownWidget";

const SIZE_CLASSES = {
	small: "col-span-1",
	medium: "col-span-2",
	large: "col-span-3",
	full: "col-span-4",
};

export default function WidgetRenderingEngine({ widgets = [] }) {
	const orderedWidgets = [...widgets].sort((a, b) => a.order - b.order);

	return (
		<div className="grid grid-cols-4 gap-6">
			{orderedWidgets.map((widget) => {
				const Component =
					widgetRegistry.resolve(widget.type) ?? UnknownWidget;

				return (
					<div
						key={widget.id}
						className={
							SIZE_CLASSES[widget.size] ?? SIZE_CLASSES.medium
						}
					>
						<Component widget={widget} />
					</div>
				);
			})}
		</div>
	);
}
