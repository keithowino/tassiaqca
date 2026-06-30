import { HTTP_STATUS } from "../constants/index.js";
import AppError from "./AppError.js";
import ErrorCodes from "./ErrorCodes.js";

export default function errorHandler(err, req, res, next) {
	if (!(err instanceof AppError)) {
		console.error(err);

		err = new AppError(
			"Internal Server Error",
			HTTP_STATUS.INTERNAL_SERVER_ERROR,
			ErrorCodes.INTERNAL_SERVER_ERROR,
		);
	}

	// Log unexpected server errors.
	if (err.statusCode >= HTTP_STATUS.INTERNAL_SERVER_ERROR) {
		console.error(err.stack);
	}

	return res.status(err.statusCode).json({
		success: false,

		error: {
			code: err.code,
			message: err.message,
			details: err.details,
		},
	});
}
