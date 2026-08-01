import User from "../../identity/models/User.js";
import { hashPassword } from "../utils/password.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import AppError from "../../../shared/errors/AppError.js";
import ErrorCodes from "../../../shared/errors/ErrorCodes.js";

export default async function register(data) {
	const existingUser = await User.findOne({
		email: data.email.toLowerCase(),
	});

	if (existingUser) {
		throw new AppError("Email already exists", 409, ErrorCodes.CONFLICT);
	}

	const password = await hashPassword(data.password);

	const user = await User.create({
		firstName: data.firstName,
		lastName: data.lastName,
		email: data.email.toLowerCase(),
		phone: data.phone,
		password,
	});

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
