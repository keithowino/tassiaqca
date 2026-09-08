import { useCallback, useEffect, useState } from "react";

import { sessions as fetchSessions } from "../../../platform/identity";

export default function useSessions() {
	const [sessions, setSessions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const loadSessions = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const result = await fetchSessions();

			setSessions(result?.sessions ?? []);
		} catch (err) {
			setError(
				err?.response?.data?.error?.message ??
					"Unable to load your active sessions.",
			);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		loadSessions();
	}, [loadSessions]);

	return {
		sessions,
		loading,
		error,
		reload: loadSessions,
	};
}
