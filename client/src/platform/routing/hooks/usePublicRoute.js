import { useIdentity } from "../../identity";

export default function usePublicRoute() {
	const { isAuthenticated, isLoading } = useIdentity();

	return {
		isAuthenticated,
		isLoading,
	};
}
