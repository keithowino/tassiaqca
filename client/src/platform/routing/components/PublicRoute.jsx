import { Navigate, Outlet } from "react-router-dom";

import usePublicRoute from "../hooks/usePublicRoute";

import { useJourney, resolveJourney } from "../../journey";

export default function PublicRoute() {
	const { isAuthenticated, isLoading } = usePublicRoute();

	const { intent } = useJourney();

	if (isLoading) {
		return null;
	}

	if (isAuthenticated) {
		return <Navigate to={resolveJourney(intent)} replace />;
	}

	return <Outlet />;
}
