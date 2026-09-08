# Implementation Plan

You proposed splitting 2D.5 into five small implementation units:

```text
2D.5
 │
 ├── 2D.5.1 Account/Security route
 │
 ├── 2D.5.2 Security page
 │
 ├── 2D.5.3 Session list
 │
 ├── 2D.5.4 Session cards
 │
 └── 2D.5.5 Loading/error/empty states
```

Then:

```text
2D.6  Revoke individual session
2D.7  Revoke other sessions
2D.8  Browser verification
2D.9  Documentation
```

Then you mentioned, the architecture specification says frontend applications use feature-oriented organization, with features containing their own components, pages, hooks, services, types, and utilities.

Therefore, the cleaner long-term structure may actually be:

```text
client/src/applications/authentication/
│
└── features/
    └── security/
        ├── components/
        ├── hooks/
        ├── pages/
        └── ...
```

To confirm this you proposed to inspect the current authentication application:

```text
├── client/
│   ├── src/
│   │   ├── applications/
│   │   │   ├── authentication/
│   │   │   │   ├── components/
│   │   │   │   │   ├── AuthCard.jsx
│   │   │   │   │   ├── AuthFooter.jsx
│   │   │   │   │   ├── AuthHeader.jsx
│   │   │   │   │   ├── LoginForm.jsx
│   │   │   │   │   └── RegisterForm.jsx
│   │   │   │   ├── hooks/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── useLoginForm.js
│   │   │   │   │   └── useRegisterForm.js
│   │   │   │   ├── layouts/
│   │   │   │   │   └── AuthLayout.jsx
│   │   │   │   ├── pages/
│   │   │   │   │   ├── LoginPage.jsx
│   │   │   │   │   └── RegisterPage.jsx
│   │   │   │   ├── routes/
│   │   │   │   │   └── authentication.routes.jsx
│   │   │   │   └── index.js
│   │   │   └── ...
│   │   └── ...
│   └── ...
└── ...
```

Here are the current states of the following files:

```jsx
`~\client\src\applications\authentication\routes\authentication.routes.jsx`;

import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { PublicRoute } from "../../../platform/routing";

const authenticationRoutes = [
	{
		element: <AuthLayout />,

		children: [
			{
				element: <PublicRoute />,

				children: [
					{
						path: "/login",
						element: <LoginPage />,
					},

					{
						path: "/register",
						element: <RegisterPage />,
					},
				],
			},
		],
	},
];

export default authenticationRoutes;
```

```jsx
`~\client\src\applications\authentication\pages\LoginPage.jsx`;

import AuthCard from "../components/AuthCard";
import AuthHeader from "../components/AuthHeader";
import AuthFooter from "../components/AuthFooter";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
	return (
		<AuthCard>
			<AuthHeader
				title="Welcome Back"
				description="Sign in to continue to your workspace."
			/>

			<LoginForm />

			<AuthFooter
				label="Don't have an account?"
				link="/register"
				linkLabel="Create one"
			/>
		</AuthCard>
	);
}
```

```jsx
`~\client\src\applications\authentication\components\LoginForm.jsx`;

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
```

```jsx
`~\client\src\applications\authentication\pages\RegisterPage.jsx`;

import AuthCard from "../components/AuthCard";
import AuthHeader from "../components/AuthHeader";
import AuthFooter from "../components/AuthFooter";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
	return (
		<AuthCard>
			<AuthHeader
				title="Create Your Account"
				description="Join TassiaQCA and start exploring your community."
			/>

			<RegisterForm />

			<AuthFooter
				label="Already have an account?"
				link="/login"
				linkLabel="Sign in"
			/>
		</AuthCard>
	);
}
```

```jsx
`~\client\src\applications\authentication\components\RegisterForm.jsx`;

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
```
