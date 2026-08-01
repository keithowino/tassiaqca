import { useState } from "react";

import { useIdentity } from "../../../platform/identity";
import { useNavigate } from "react-router-dom";
import { resolveJourney, useJourney } from "../../../platform/journey";

const INITIAL_VALUES = {
	email: "",
	password: "",
};

export default function useLoginForm() {
	const navigate = useNavigate();

	const { login } = useIdentity();

	const { intent } = useJourney();

	const [values, setValues] = useState(INITIAL_VALUES);

	const [loading, setLoading] = useState(false);

	const [error, setError] = useState(null);

	function update(name, value) {
		setValues((previous) => ({
			...previous,
			[name]: value,
		}));
	}

	async function submit(event) {
		event.preventDefault();

		setLoading(true);

		setError(null);

		try {
			await login(values);

			navigate(resolveJourney(intent), {
				replace: true,
			});
		} catch (err) {
			setError(
				err?.response?.data?.error?.message ?? "Unable to sign in.",
			);
		} finally {
			setLoading(false);
		}
	}

	return {
		values,
		loading,
		error,
		update,
		submit,
	};
}
