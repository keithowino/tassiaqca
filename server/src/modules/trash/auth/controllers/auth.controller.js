import authService from "../services/auth.service.js";
import asyncHandler from "../../../shared/utils/asyncHandler.js";
import validateRequest from "../../../shared/validation/validateRequest.js";
import { success } from "../../../shared/utils/apiResponse.js";
import registerSchema from "../validators/register.validator.js";
import loginSchema from "../validators/login.validator.js";
import { HTTP_STATUS } from "../../../shared/constants";

export const register = asyncHandler(async (req, res) => {
	const { body } = validateRequest(
		{
			body: registerSchema,
		},
		req,
	);

	const result = await authService.register(body);

	return success(
		res,
		result,
		"User registered successfully.",
		HTTP_STATUS.CREATED,
	);
});

export const login = asyncHandler(async (req, res) => {
	const { body } = validateRequest(
		{
			body: loginSchema,
		},
		req,
	);

	const result = await authService.login(body);

	return success(res, result, "Login successful.");
});
