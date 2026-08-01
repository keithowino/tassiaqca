import { Link } from "react-router-dom";

import useJourney from "../hooks/useJourney";
import { resolveJourney } from "../services/journeyResolver";

export default function JourneyLink({ intent, onClick, children, ...props }) {
	const { beginJourney } = useJourney();

	const handleClick = (event) => {
		beginJourney(intent);

		onClick?.(event);
	};

	return (
		<Link to={resolveJourney(intent)} onClick={handleClick} {...props}>
			{children}
		</Link>
	);
}
