import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import businessService from "../services/business.service";

import { bootstrapSession } from "../../../../platform/workspace";

export default function useBusinessHub() {
	const navigate = useNavigate();

	const [businesses, setBusinesses] = useState([]);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadBusinesses();
	}, []);

	async function loadBusinesses() {
		try {
			const result = await businessService.listBusinesses();

			setBusinesses(result);
		} finally {
			setLoading(false);
		}
	}

	function openWorkspace(business) {
		bootstrapSession.begin({
			businessId: business.id,
		});

		navigate("/bootstrap");
	}

	function createBusiness() {
		navigate("/business/onboarding");
	}

	return {
		businesses,

		loading,

		openWorkspace,

		createBusiness,

		reload: loadBusinesses,
	};
}
