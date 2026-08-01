import { useMemo, useState } from "react";

import PlatformContext from "./PlatformContext";

export function PlatformProvider({ children }) {
	const [actor, setActor] = useState(null);

	const [application, setApplication] = useState(null);

	const [business, setBusiness] = useState(null);

	const [session, setSession] = useState(null);

	const value = useMemo(
		() => ({
			actor,
			application,
			business,
			session,

			setActor,
			setApplication,
			setBusiness,
			setSession,
		}),
		[actor, application, business, session],
	);

	return (
		<PlatformContext.Provider value={value}>
			{children}
		</PlatformContext.Provider>
	);
}
