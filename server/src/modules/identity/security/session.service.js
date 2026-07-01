import ms from "ms";
import env from "../../../app/config/env.js";
import sessionRepository from "../repositories/session.repository.js";
import accessTokenService from "./accessToken.service.js";
import refreshTokenService from "./refreshToken.service.js";
import { hashToken } from "./tokenHasher.js";
import userRepository from "../repositories/user.repository.js";
import AppError from "../../../shared/errors/AppError.js";
import ErrorCodes from "../../../shared/errors/ErrorCodes.js";
import { HTTP_STATUS } from "../../../shared/constants/index.js";

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

	async rotate(refreshToken, metadata = {}) {
		// 1. Verify JWT signature.
		refreshTokenService.verify(refreshToken);

		// 2. Hash the received token.
		const refreshTokenHash = hashToken(refreshToken);

		// 3. Find the matching active session.
		const session =
			await sessionRepository.findByRefreshTokenHash(refreshTokenHash);

		if (!session) {
			throw new AppError(
				"Invalid refresh token.",
				HTTP_STATUS.UNAUTHORIZED,
				ErrorCodes.UNAUTHORIZED,
			);
		}

		// 4. Load the user.
		const user = await userRepository.findById(session.user);

		if (!user || !user.active) {
			throw new AppError(
				"Invalid refresh token.",
				HTTP_STATUS.UNAUTHORIZED,
				ErrorCodes.UNAUTHORIZED,
			);
		}

		// 5. Revoke the old session.
		await sessionRepository.revoke(session);

		// 6. Issue a brand-new session.
		return this.create(user, metadata);
	}
}

export default new SessionService();
