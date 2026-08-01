import User from "../../identity/models/User.js";
import { comparePassword } from "../utils/password.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import AppError from "../../../shared/errors/AppError.js";
import ErrorCodes from "../../../shared/errors/ErrorCodes.js";

export default async function login(email, password) {
	const user = await User.findOne({
		email: email.toLowerCase(),
	}).select("+refreshToken");

	if (!user) {
		throw new AppError(
			"Invalid email or password",
			401,
			ErrorCodes.UNAUTHORIZED,
		);
	}

	const validPassword = await comparePassword(password, user.password);

	if (!validPassword) {
		throw new AppError(
			"Invalid email or password",
			401,
			ErrorCodes.UNAUTHORIZED,
		);
	}

	const accessToken = generateAccessToken(user);

	const refreshToken = generateRefreshToken(user);

	user.refreshToken = refreshToken;

	await user.save();

	return {
		user,
		accessToken,
		refreshToken,
	};
}
