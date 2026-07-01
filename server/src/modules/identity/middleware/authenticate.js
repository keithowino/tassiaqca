import accessTokenService from "../security/accessToken.service.js";
import userRepository from "../repositories/user.repository.js";

import AppError from "../../../shared/errors/AppError.js";
import ErrorCodes from "../../../shared/errors/ErrorCodes.js";
import { HTTP_STATUS } from "../../../shared/constants/index.js";

export default async function authenticate(req, res, next) {
	try {
		const authorization = req.headers.authorization;

		if (!authorization) {
			throw new AppError(
				"Authentication required.",
				HTTP_STATUS.UNAUTHORIZED,
				ErrorCodes.UNAUTHORIZED,
			);
		}

		const [scheme, token] = authorization.split(" ");

		if (scheme !== "Bearer" || !token) {
			throw new AppError(
				"Authentication required.",
				HTTP_STATUS.UNAUTHORIZED,
				ErrorCodes.UNAUTHORIZED,
			);
		}

		const payload = accessTokenService.verify(token);

		const user = await userRepository.findById(payload.sub);

		if (!user || !user.active) {
			throw new AppError(
				"Authentication required.",
				HTTP_STATUS.UNAUTHORIZED,
				ErrorCodes.UNAUTHORIZED,
			);
		}

		req.user = user;

		next();
	} catch (error) {
		next(error);
	}
}
