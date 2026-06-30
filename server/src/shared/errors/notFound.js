import AppError from "./AppError.js";
import ErrorCodes from "./ErrorCodes.js";

export default function notFound(req, res, next) {
	next(
		new AppError(
			`Route ${req.originalUrl} not found`,
			404,
			ErrorCodes.NOT_FOUND,
		),
	);
}
