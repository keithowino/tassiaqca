import { useState } from "react";

import { useIdentity } from "../../../platform/identity";
import { useNavigate } from "react-router-dom";
import { resolveJourney, useJourney } from "../../../platform/journey";

const INITIAL_VALUES = {
	firstName: "",
	lastName: "",
	email: "",
	phone: "",
	password: "",
	confirmPassword: "",
};

export default function useRegisterForm() {
	const navigate = useNavigate();

	const { register } = useIdentity();

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

		setError(null);

		if (values.password !== values.confirmPassword) {
			setError("Passwords do not match.");

			return;
		}

		setLoading(true);

		try {
			await register({
				firstName: values.firstName,
				lastName: values.lastName,
				email: values.email,
				phone: values.phone,
				password: values.password,
			});

			navigate(resolveJourney(intent), {
				replace: true,
			});
		} catch (err) {
			setError(
				err?.response?.data?.error?.message ??
					"Unable to create account.",
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
