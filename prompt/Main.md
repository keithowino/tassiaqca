```js
`~\client\src\applications\authentication\hooks\useLoginForm.js`;

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
```

```js
`~\client\src\applications\authentication\hooks\useRegisterForm.js`;

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
```

See how the above two files used the identity provider:

```jsx
`~\client\src\platform\identity\IdentityProvider.jsx`;

import { useCallback, useEffect, useMemo, useState } from "react";

import IdentityContext from "./IdentityContext.jsx";

import * as identityService from "./identity.service.js";

import { sessionManager } from "../session/index.js";

/**
 * #### Why we are not implementing refresh yet
 * You have a refresh endpoint on the backend, but I recommend not implementing automatic token refresh in the IdentityProvider.
 *
 * Instead, it belongs to the HTTP infrastructure because every service (navigation, dashboard, configuration, future modules) relies on apiClient. A response interceptor can detect a 401, call /auth/refresh, update the SessionManager, and retry the original request transparently.
 *
 * Keeping refresh logic in the API client means the Identity layer remains focused on authentication workflows, while the networking layer handles token renewal. This separation matches the responsibilities you've established in the backend.
 */
export function IdentityProvider({ children }) {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const isAuthenticated = user !== null;

	const restoreSession = useCallback(async () => {
		if (!sessionManager.hasAccessToken()) {
			setUser(null);
			setIsLoading(false);
			return;
		}

		try {
			const user = await identityService.me();
			setUser(user);
		} catch (error) {
			sessionManager.clearSession();
			setUser(null);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		restoreSession();
	}, [restoreSession]);

	useEffect(() => {
		return sessionManager.subscribe((event) => {
			if (event.type === "session:cleared") {
				setUser(null);
			}
		});
	}, []);

	async function login(credentials) {
		const result = await identityService.login(credentials);

		sessionManager.saveSession({
			accessToken: result.accessToken,
			refreshToken: result.refreshToken,
		});

		const user = await identityService.me();

		setUser(user);

		return user;
	}

	async function register(command) {
		const result = await identityService.register(command);

		sessionManager.saveSession({
			accessToken: result.accessToken,
			refreshToken: result.refreshToken,
		});

		const user = await identityService.me();

		setUser(user);

		return user;
	}

	const logout = useCallback(async () => {
		try {
			if (sessionManager.hasRefreshToken()) {
				await identityService.logout(sessionManager.getRefreshToken());
			}
		} finally {
			sessionManager.clearSession();
			setUser(null);
		}
	}, []);

	const value = useMemo(
		() => ({
			user,

			isLoading,

			isAuthenticated,

			login,

			register,

			logout,

			restoreSession,
		}),
		[
			user,

			isLoading,

			isAuthenticated,

			login,

			register,

			logout,

			restoreSession,
		],
	);

	return (
		<IdentityContext.Provider value={value}>
			{children}
		</IdentityContext.Provider>
	);
}
```

```js
`~\client\src\platform\identity\identity.service.js`;

import { request } from "../api";

export const register = async (payload) => {
	const { data } = await request.post("/auth/register", payload);

	return data.data;
};

export const login = async (payload) => {
	const { data } = await request.post("/auth/login", payload);

	return data.data;
};

export const refresh = async (refreshToken) => {
	const { data } = await request.post("/auth/refresh", {
		refreshToken,
	});

	return data.data;
};

export const logout = async (refreshToken) => {
	await request.post("/auth/logout", {
		refreshToken,
	});
};

export const me = async () => {
	const response = await request.get("/auth/me");

	return response.data.data.user;
};

export const sessions = async () => {
	const { data } = await request.get("/auth/sessions");

	return data.data;
};

export const revokeSession = async (sessionId) => {
	await request.delete(`/auth/sessions/${sessionId}`);
};

export const revokeOtherSessions = async () => {
	await request.delete("/auth/sessions");
};
```

I mentioned the above two hooks because i wanted for us to confirm whether useSessions hook is consuming the identity provider in a similar and the correct way:

```js
`~\client\src\applications\authentication\hooks\useSessions.js`;

import { useCallback, useEffect, useState } from "react";

import { sessions as fetchSessions } from "../../../platform/identity";

export default function useSessions() {
	const [sessions, setSessions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const loadSessions = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const result = await fetchSessions();

			setSessions(result?.sessions ?? []);
		} catch (err) {
			setError(
				err?.message ||
					"Unable to load your active sessions. Please try again.",
			);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		loadSessions();
	}, [loadSessions]);

	return {
		sessions,
		loading,
		error,
		reload: loadSessions,
	};
}
```
