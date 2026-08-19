import authService from "../services/auth.service.js";

import { validateRequest } from "../../../shared/index.js";
import { userPresenter } from "../presenters/index.js";
import {
	loginRequestSchema,
	logoutRequestSchema,
	refreshRequestSchema,
	registerRequestSchema,
} from "../validators/index.js";

class AuthController {
	async sessions(req, res, next) {
		try {
			const result = await authService.sessions(
				req.user._id,
				req.sessionId,
			);

			return res.status(200).json({
				success: true,
				data: result,
			});
		} catch (error) {
			next(error);
		}
	}

	async register(req, res, next) {
		try {
			const { body } = validateRequest(
				{
					body: registerRequestSchema,
				},
				req,
			);

			const result = await authService.register(body);

			return res.status(201).json({
				success: true,
				data: result,
			});
		} catch (error) {
			next(error);
		}
	}

	async login(req, res, next) {
		try {
			const { body } = validateRequest(
				{
					body: loginRequestSchema,
				},
				req,
			);

			const result = await authService.login(body);

			return res.status(200).json({
				success: true,
				data: result,
			});
		} catch (error) {
			next(error);
		}
	}

	async refresh(req, res, next) {
		try {
			const { body } = validateRequest(
				{
					body: refreshRequestSchema,
				},
				req,
			);

			const { refreshToken } = body;

			const result = await authService.refresh(refreshToken);

			return res.status(200).json({
				success: true,
				data: result,
			});
		} catch (error) {
			next(error);
		}
	}

	async logout(req, res, next) {
		try {
			const { body } = validateRequest(
				{
					body: logoutRequestSchema,
				},
				req,
			);

			const { refreshToken } = body;

			await authService.logout(refreshToken);

			return res.status(200).json({
				success: true,
				message: "Logged out successfully.",
			});
		} catch (error) {
			next(error);
		}
	}

	async revokeSession(req, res, next) {
		try {
			await authService.revokeSession(req.user._id, req.params.sessionId);

			return res.status(200).json({
				success: true,
				message: "Session revoked successfully.",
			});
		} catch (error) {
			next(error);
		}
	}

	async revokeOtherSessions(req, res, next) {
		try {
			await authService.revokeOtherSessions(req.user._id, req.sessionId);

			return res.status(200).json({
				success: true,
				message: "Other sessions revoked successfully.",
			});
		} catch (error) {
			next(error);
		}
	}

	async me(req, res, next) {
		try {
			return res.status(200).json({
				success: true,
				data: {
					user: userPresenter.present(req.user),
				},
			});
		} catch (error) {
			next(error);
		}
	}
}

export default new AuthController();
