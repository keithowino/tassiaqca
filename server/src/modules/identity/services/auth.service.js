import userRepository from "../repositories/user.repository.js";
import passwordService from "../security/password.service.js";
import sessionService from "../security/session.service.js";
import { AppError, ErrorCodes, HTTP_STATUS } from "../../../shared/index.js";
import { userPresenter } from "../presenters/index.js";

/**
 * Orchestrates authentication workflows (register, login, logout).
 */
class AuthService {
	async sessions(userId, currentSessionId) {
		return sessionService.list(userId, currentSessionId);
	}

	async register({ data, requestMetadata }) {
		const existingUser = await userRepository.findByEmail(data.email);

		if (existingUser) {
			throw new AppError(
				"An account with this email already exists.",
				HTTP_STATUS.CONFLICT,
				ErrorCodes.CONFLICT,
			);
		}

		const hashedPassword = await passwordService.hash(data.password);

		const user = await userRepository.create({
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			phone: data.phone,
			password: hashedPassword,
		});

		// const tokens = await sessionService.create(user);
		const tokens = await sessionService.create(user, requestMetadata);

		return {
			user: userPresenter.present(user),
			...tokens,
		};
	}

	async login({ data, requestMetadata }) {
		const user = await userRepository.findByEmail(data.email);

		/**
		 * Never reveal whether the email exists.
		 */
		if (!user) {
			throw new AppError(
				"Invalid email or password.",
				HTTP_STATUS.UNAUTHORIZED,
				ErrorCodes.UNAUTHORIZED,
			);
		}

		const passwordMatches = await passwordService.compare(
			data.password,
			user.password,
		);

		if (!passwordMatches) {
			throw new AppError(
				"Invalid email or password.",
				HTTP_STATUS.UNAUTHORIZED,
				ErrorCodes.UNAUTHORIZED,
			);
		}

		// const tokens = await sessionService.create(user);
		const tokens = await sessionService.create(user, requestMetadata);

		return {
			user: userPresenter.present(user),
			...tokens,
		};
	}

	async refresh(refreshToken, metadata = {}) {
		return sessionService.rotate(refreshToken, metadata);
	}

	async logout(refreshToken) {
		return sessionService.logout(refreshToken);
	}

	async revokeSession(userId, sessionId) {
		return sessionService.revoke(userId, sessionId);
	}

	async revokeOtherSessions(userId, currentSessionId) {
		return sessionService.revokeOthers(userId, currentSessionId);
	}
}

export default new AuthService();
