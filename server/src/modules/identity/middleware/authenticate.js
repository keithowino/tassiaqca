import accessTokenService from "../security/accessToken.service.js";
import userRepository from "../repositories/user.repository.js";

import { AppError, ErrorCodes, HTTP_STATUS } from "../../../shared/index.js";
import sessionService from "../security/session.service.js";

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

		req.sessionId = payload.sid;

		/**
		 * This way, every authenticated request refreshes the activity timestamp.
		 */
		await sessionService.touch(req.sessionId);

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
