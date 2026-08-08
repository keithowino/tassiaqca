import { ZodError } from "zod";

import { HTTP_STATUS } from "../constants/index.js";
import AppError from "./AppError.js";
import ErrorCodes from "./ErrorCodes.js";

export default function errorHandler(err, req, res, next) {
	/**
	 * This was added to avoid duplicated of the same error handling logic through files
	 */
	if (err instanceof ZodError) {
		err = new AppError(
			"Validation failed.",
			HTTP_STATUS.BAD_REQUEST,
			ErrorCodes.VALIDATION_ERROR,
			err.issues,
		);
	}

	if (!(err instanceof AppError)) {
		console.error(err);

		err = new AppError(
			"Internal Server Error",
			HTTP_STATUS.INTERNAL_SERVER_ERROR,
			ErrorCodes.INTERNAL_SERVER_ERROR,
		);
	}

	/**
	 * Log unexpected server errors.
	 */
	if (err.statusCode >= HTTP_STATUS.INTERNAL_SERVER_ERROR) {
		console.error(err.stack);
	}

	return res.status(err.statusCode).json({
		success: false,

		error: {
			code: err.code,
			message: err.message || "Something went wrong!",
			details: err.details,
		},
	});
}
