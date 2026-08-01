import { useEffect, useState } from "react";

import BusinessTypeCard from "./BusinessTypeCard";

import { registryService } from "../../../../platform/registries";

export default function BusinessTypeSelector({ value, onChange }) {
	const [businessTypes, setBusinessTypes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let mounted = true;

		async function loadBusinessTypes() {
			try {
				setLoading(true);

				const response = await registryService.getBusinessTypes();

				if (mounted) {
					setBusinessTypes(response);
				}
			} catch (err) {
				if (mounted) {
					setError(err?.message ?? "Unable to load business types.");
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

	if (loading) {
		return (
			<div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
				Loading business types...
			</div>
		);
	}

	if (error) {
		return (
			<div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-600">
				{error}
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold text-gray-900">
					Choose your business type
				</h2>

				<p className="mt-2 text-gray-600">
					We'll automatically configure your Business Operating System
					based on the type of business you operate.
				</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
				{businessTypes.map((businessType) => (
					<BusinessTypeCard
						key={businessType.id}
						businessType={businessType}
						selected={value === businessType.id}
						onSelect={onChange}
					/>
				))}
			</div>
		</div>
	);
}
