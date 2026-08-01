const environment = Object.freeze({
	apiBaseUrl:
		import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api/v1",

	appName: import.meta.env.VITE_APP_NAME ?? "TassiaQCA",

	mode: import.meta.env.MODE,
});

export default environment;
