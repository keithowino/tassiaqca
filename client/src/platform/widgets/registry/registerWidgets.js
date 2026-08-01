import widgetRegistry from "./widgetRegistry";

import StatWidget from "../widgets/StatWidget";
import TableWidget from "../widgets/TableWidget";
import ChartWidget from "../widgets/ChartWidget";
import SummaryWidget from "../widgets/SummaryWidget";
import CalendarWidget from "../widgets/CalendarWidget";
import ListWidget from "../widgets/ListWidget";
import AlertWidget from "../widgets/AlertWidget";

/**
 * This renderer intentionally remains generic. Later it will be like:
 *  - StatWidget
 *  - ChartWidget
 *  - TableWidget
 *
 *  - CalendarWidget
 *  - SummaryWidget
 *  - AlertWidget
 *  - ListWidget
 * 	- ActivityWidget
 * 	- KanbanWidget
 * 	- TimelineWidget
 * 	- QuickActionsWidget
 * 	- NotificationWidget
 * 	- MapWidget
 * 	- InventoryWidget
 * 	- BookingWidget
 */
export default function registerWidgets() {
	widgetRegistry.register("stat", StatWidget);

	widgetRegistry.register("table", TableWidget);

	widgetRegistry.register("chart", ChartWidget);

	widgetRegistry.register("summary", SummaryWidget);

	widgetRegistry.register("calendar", CalendarWidget);

	widgetRegistry.register("list", ListWidget);

	widgetRegistry.register("alert", AlertWidget);
}
