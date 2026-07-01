import authService from "../services/auth.service.js";

import validateRequest from "../../../shared/validation/validateRequest.js";
import registerRequestSchema from "../validators/register.validator.js";
import loginRequestSchema from "../validators/login.validator.js";
import refreshRequestSchema from "../validators/refresh.validator.js";
import userPresenter from "../presenters/user.presenter.js";

class AuthController {
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

	async me(req, res, next) {
		try {
			return res.status(200).json({
				success: true,
				data: {
					user: userPresenter.public(req.user),
				},
			});
		} catch (error) {
			next(error);
		}
	}
}

export default new AuthController();
