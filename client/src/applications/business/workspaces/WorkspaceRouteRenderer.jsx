import { useMemo } from "react";
import { useLocation } from "react-router-dom";

import useWorkspace from "../../../platform/workspace/hooks/useWorkspace";

import BusinessWorkspace from "./BusinessWorkspace";

export default function WorkspaceRouteRenderer() {
	const location = useLocation();

	const {
		workspace: { navigation },
	} = useWorkspace();

	const activeModule = useMemo(() => {
		if (!navigation?.items) {
			return null;
		}

		return (
			navigation.items.find((item) =>
				location.pathname.startsWith(
					`/business${item.path === "/" ? "" : item.path}`,
				),
			) ?? navigation.items[0]
		);
	}, [location.pathname, navigation]);

	return <BusinessWorkspace module={activeModule} />;
}
