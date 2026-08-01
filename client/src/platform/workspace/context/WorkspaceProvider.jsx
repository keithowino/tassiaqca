import { useMemo, useState } from "react";

import WorkspaceContext from "./WorkspaceContext";
import { workspaceInitialState } from "../types/workspace.initialState";

export default function WorkspaceProvider({ children }) {
	const [workspace, setWorkspace] = useState(workspaceInitialState);

	const initialize = (payload) => {
		setWorkspace({
			...payload,

			loading: false,

			ready: true,

			error: null,
		});
	};

	const reset = () => {
		setWorkspace(workspaceInitialState);
	};

	const value = useMemo(
		() => ({
			workspace,

			initialize,

			reset,
		}),
		[workspace],
	);

	return (
		<WorkspaceContext.Provider value={value}>
			{children}
		</WorkspaceContext.Provider>
	);
}
