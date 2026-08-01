import {
	Button,
	Form,
	FormActions,
	FormError,
	FormField,
	FormInput,
	FormLabel,
} from "../../../shared/ui";

import { useRegisterForm } from "../hooks";

export default function RegisterForm() {
	const { values, loading, error, update, submit } = useRegisterForm();

	return (
		<Form onSubmit={submit}>
			<FormField>
				<FormLabel htmlFor="firstName" required>
					First Name
				</FormLabel>

				<FormInput
					id="firstName"
					value={values.firstName}
					onChange={(event) =>
						update("firstName", event.target.value)
					}
					autoComplete="given-name"
				/>
			</FormField>

			<FormField>
				<FormLabel htmlFor="lastName">Last Name</FormLabel>

				<FormInput
					id="lastName"
					value={values.lastName}
					onChange={(event) => update("lastName", event.target.value)}
					autoComplete="family-name"
				/>
			</FormField>

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
				<FormLabel htmlFor="phone">Phone Number</FormLabel>

				<FormInput
					id="phone"
					type="tel"
					value={values.phone}
					onChange={(event) => update("phone", event.target.value)}
					autoComplete="tel"
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
					autoComplete="new-password"
				/>
			</FormField>

			<FormField>
				<FormLabel htmlFor="confirmPassword" required>
					Confirm Password
				</FormLabel>

				<FormInput
					id="confirmPassword"
					type="password"
					value={values.confirmPassword}
					onChange={(event) =>
						update("confirmPassword", event.target.value)
					}
					autoComplete="new-password"
				/>
			</FormField>

			<FormError>{error}</FormError>

			<FormActions>
				<Button type="submit" className="w-full" disabled={loading}>
					{loading ? "Creating Account..." : "Create Account"}
				</Button>
			</FormActions>
		</Form>
	);
}
