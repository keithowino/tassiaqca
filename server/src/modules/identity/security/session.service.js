import ms from "ms";
import env from "../../../app/config/env.js";
import sessionRepository from "../repositories/session.repository.js";
import accessTokenService from "./accessToken.service.js";
import refreshTokenService from "./refreshToken.service.js";
import { hashToken } from "./tokenHasher.js";

class SessionService {
	async create(user, metadata = {}) {
		const accessToken = accessTokenService.generate(user);
		const refreshToken = refreshTokenService.generate(user);
		const expiresAt = new Date(Date.now() + ms(env.jwt.refreshExpires));

		await sessionRepository.create({
			user: user._id,
			refreshTokenHash: hashToken(refreshToken),
			expiresAt,
			ipAddress: metadata.ipAddress ?? null,
			userAgent: metadata.userAgent ?? null,
			deviceName: metadata.deviceName ?? null,
			browser: metadata.browser ?? null,
			operatingSystem: metadata.operatingSystem ?? null,
		});

		return {
			accessToken,
			refreshToken,
		};
	}
}

export default new SessionService();
