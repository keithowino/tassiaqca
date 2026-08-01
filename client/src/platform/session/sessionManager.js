import { tokenStorage } from "./tokenStorage.js";

class SessionManager {
	getAccessToken() {
		return tokenStorage.getAccessToken();
	}

	getRefreshToken() {
		return tokenStorage.getRefreshToken();
	}

	hasAccessToken() {
		return Boolean(this.getAccessToken());
	}

	hasRefreshToken() {
		return Boolean(this.getRefreshToken());
	}

	saveSession({ accessToken, refreshToken }) {
		tokenStorage.setAccessToken(accessToken);
		tokenStorage.setRefreshToken(refreshToken);
	}

	clearSession() {
		tokenStorage.clear();
	}
}

export default new SessionManager();
