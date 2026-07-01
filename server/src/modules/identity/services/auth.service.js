// orchestrates authentication workflows (register, login, logout).
import userRepository from "../repositories/user.repository.js";
import passwordService from "../security/password.service.js";
import sessionService from "../security/session.service.js";
import AppError from "../../../shared/errors/AppError.js";
import ErrorCodes from "../../../shared/errors/ErrorCodes.js";
import { HTTP_STATUS } from "../../../shared/constants/index.js";
import userPresenter from "../presenters/user.presenter.js";

class AuthService {
	async register(command) {
		const existingUser = await userRepository.findByEmail(command.email);

		if (existingUser) {
			throw new AppError(
				"An account with this email already exists.",
				HTTP_STATUS.CONFLICT,
				ErrorCodes.CONFLICT,
			);
		}

		const hashedPassword = await passwordService.hash(command.password);

		const user = await userRepository.create({
			firstName: command.firstName,
			lastName: command.lastName,
			email: command.email,
			phone: command.phone,
			password: hashedPassword,
		});

		const tokens = await sessionService.create(user);

		return {
			user: userPresenter.public(user),
			...tokens,
		};
	}

	async login(command) {
		const user = await userRepository.findByEmail(command.email);

		// Never reveal whether the email exists.
		if (!user) {
			throw new AppError(
				"Invalid email or password.",
				HTTP_STATUS.UNAUTHORIZED,
				ErrorCodes.UNAUTHORIZED,
			);
		}

		const passwordMatches = await passwordService.compare(
			command.password,
			user.password,
		);

		// Same response for incorrect password.
		if (!passwordMatches) {
			throw new AppError(
				"Invalid email or password.",
				HTTP_STATUS.UNAUTHORIZED,
				ErrorCodes.UNAUTHORIZED,
			);
		}

		const tokens = await sessionService.create(user);

		return {
			user: userPresenter.public(user),
			...tokens,
		};
	}

	async refresh(refreshToken, metadata = {}) {
		return sessionService.rotate(refreshToken, metadata);
	}
}

export default new AuthService();
