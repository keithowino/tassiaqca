import { ZodError } from "zod";
import AppError from "../errors/AppError.js";
import ErrorCodes from "../errors/ErrorCodes.js";
import { HTTP_STATUS } from "../constants/index.js";

export default function validateRequest({ body, params, query, headers }, req) {
	try {
		return {
			body: body ? body.parse(req.body) : req.body,
			params: params ? params.parse(req.params) : req.params,
			query: query ? query.parse(req.query) : req.query,
			headers: headers ? headers.parse(req.headers) : req.headers,
		};
	} catch (error) {
		if (error instanceof ZodError) {
			throw new AppError(
				"Validation failed.",
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.VALIDATION_ERROR,
				error.issues,
			);
		}

		throw error;
	}
}
