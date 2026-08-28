import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import useWorkspace from "../../../platform/workspace/hooks/useWorkspace";

import BusinessWorkspace from "./BusinessWorkspace";

export default function WorkspaceRouteRenderer() {
	const location = useLocation();

	const {
		workspace: { navigation },
	} = useWorkspace();

	/**
	 * The method below was added as a modification after the client failed to display the dashboard/ widgets as expected.
	 */
	const navigationItems = useMemo(() => {
		if (!navigation?.sections?.length) {
			return [];
		}

		return navigation.sections.flatMap((section) => section.items ?? []);
	}, [navigation]);

	const activeModule = useMemo(() => {
		if (!navigationItems.length) {
			return null;
		}

		// return (
		// 	navigation.items.find((item) =>
		// 		location.pathname.startsWith(
		// 			`/business${item.path === "/" ? "" : item.path}`,
		// 		),
		// 	) ?? navigation.items[0]
		// );
		return (
			navigationItems.find((item) => {
				const route = item.route === "/" ? "" : item.route;

				return location.pathname.startsWith(`/business${route}`);
			}) ?? navigationItems[0]
		);
		// }, [location.pathname, navigation]);
	}, [location.pathname, navigationItems]);

	return <BusinessWorkspace module={activeModule} />;
}
