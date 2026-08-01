import { useMemo, useState } from "react";

import JourneyContext from "./JourneyContext";

import journeySession from "../services/journeySession";

export default function JourneyProvider({ children }) {
	const [intent, setIntent] = useState(journeySession.get());

	const beginJourney = (nextIntent) => {
		journeySession.begin(nextIntent);

		setIntent(nextIntent);
	};

	const clearJourney = () => {
		journeySession.clear();

		setIntent(null);
	};

	const value = useMemo(
		() => ({
			intent,

			beginJourney,

			clearJourney,
		}),
		[intent],
	);

	return (
		<JourneyContext.Provider value={value}>
			{children}
		</JourneyContext.Provider>
	);
}
