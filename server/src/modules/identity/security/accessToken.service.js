import jwt from "jsonwebtoken";
import env from "../../../app/config/env.js";
import AppError from "../../../shared/errors/AppError.js";
import ErrorCodes from "../../../shared/errors/ErrorCodes.js";
import { HTTP_STATUS } from "../../../shared/constants/index.js";

class AccessTokenService {
	generate(user) {
		return jwt.sign(
			{
				sub: user._id.toString(),
				email: user.email,
			},
			env.jwt.accessSecret,
			{
				expiresIn: env.jwt.accessExpires,
				issuer: env.jwt.issuer,
				audience: env.jwt.audience,
			},
		);
	}

	verify(token) {
		try {
			return jwt.verify(token, env.jwt.accessSecret, {
				issuer: env.jwt.issuer,
				audience: env.jwt.audience,
			});
		} catch (error) {
			if (error.name === "TokenExpiredError") {
				throw new AppError(
					"Access token has expired.",
					HTTP_STATUS.UNAUTHORIZED,
					ErrorCodes.UNAUTHORIZED,
				);
			}

			throw new AppError(
				"Invalid access token.",
				HTTP_STATUS.UNAUTHORIZED,
				ErrorCodes.UNAUTHORIZED,
			);
		}
	}
}

export default new AccessTokenService();
