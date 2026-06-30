import userRepository from "../../identity/repositories/user.repository.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import AppError from "../../../shared/errors/AppError.js";
import ErrorCodes from "../../../shared/errors/ErrorCodes.js";
import { HTTP_STATUS } from "../../../shared/constants";

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

		const hashedPassword = await hashPassword(command.password);

		const user = await userRepository.create({
			firstName: command.firstName,
			lastName: command.lastName,
			email: command.email,
			phone: command.phone,
			password: hashedPassword,
		});

		const accessToken = generateAccessToken(user);

		const refreshToken = generateRefreshToken(user);

		user.refreshToken = refreshToken;

		// await userRepository.update(user);
		await userRepository.save(user);

		return {
			user: {
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
			},
			accessToken,
			refreshToken,
		};
	}

	async login(command) {
		const user = await userRepository.findByEmailWithRefreshToken(
			command.email,
		);

		if (!user) {
			throw new AppError(
				"Invalid email or password.",
				HTTP_STATUS.UNAUTHORIZED,
				ErrorCodes.UNAUTHORIZED,
			);
		}

		const validPassword = await comparePassword(
			command.password,
			user.password,
		);

		if (!validPassword) {
			throw new AppError(
				"Invalid email or password.",
				HTTP_STATUS.UNAUTHORIZED,
				ErrorCodes.UNAUTHORIZED,
			);
		}

		const accessToken = generateAccessToken(user);

		const refreshToken = generateRefreshToken(user);

		user.refreshToken = refreshToken;

		await userRepository.save(user);

		return {
			user: {
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
			},
			accessToken,
			refreshToken,
		};
	}
}

export default new AuthService();
