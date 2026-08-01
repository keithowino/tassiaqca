import { useMemo, useState } from "react";

import BootstrapContext from "./BootstrapContext";

export default function BootstrapProvider({ children }) {
	const [status, setStatus] = useState({
		stage: "idle",
		message: "",
		error: null,
	});

	const value = useMemo(
		() => ({
			status,

			setStatus,
		}),
		[status],
	);

	return (
		<BootstrapContext.Provider value={value}>
			{children}
		</BootstrapContext.Provider>
	);
}
