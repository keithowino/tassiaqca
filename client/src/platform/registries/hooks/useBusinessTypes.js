import { useEffect, useState } from "react";

import registryService from "../services/registry.service";

export default function useBusinessTypes() {
	const [businessTypes, setBusinessTypes] = useState([]);

	const [loading, setLoading] = useState(true);

	const [error, setError] = useState(null);

	useEffect(() => {
		let mounted = true;

		async function loadBusinessTypes() {
			try {
				const data = await registryService.getBusinessTypes();

				if (mounted) {
					setBusinessTypes(data);
				}
			} catch (error) {
				if (mounted) {
					setError(
						error.response?.data?.error?.message ??
							"Unable to load business types.",
					);
				}
			} finally {
				if (mounted) {
					setLoading(false);
				}
			}
		}

		loadBusinessTypes();

		return () => {
			mounted = false;
		};
	}, []);

	return {
		businessTypes,

		loading,

		error,
	};
}
