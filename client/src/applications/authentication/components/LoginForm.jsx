import { Link } from "react-router-dom";

import {
	Button,
	Form,
	FormActions,
	FormError,
	FormField,
	FormInput,
	FormLabel,
} from "../../../shared/ui";

import { useLoginForm } from "../hooks";

export default function LoginForm() {
	const { values, loading, error, update, submit } = useLoginForm();

	return (
		<Form onSubmit={submit}>
			<FormField>
				<FormLabel htmlFor="email" required>
					Email
				</FormLabel>

				<FormInput
					id="email"
					type="email"
					value={values.email}
					onChange={(event) => update("email", event.target.value)}
					autoComplete="email"
				/>
			</FormField>

			<FormField>
				<FormLabel htmlFor="password" required>
					Password
				</FormLabel>

				<FormInput
					id="password"
					type="password"
					value={values.password}
					onChange={(event) => update("password", event.target.value)}
					autoComplete="current-password"
				/>
			</FormField>

			{error && <FormError>{error}</FormError>}

			<div className="flex justify-end">
				<Link
					to="/forgot-password"
					className="text-sm text-orange-600 hover:underline"
				>
					Forgot password?
				</Link>
			</div>

			<FormActions>
				<Button type="submit" className="w-full" disabled={loading}>
					{loading ? "Signing In..." : "Sign In"}
				</Button>
			</FormActions>
		</Form>
	);
}
