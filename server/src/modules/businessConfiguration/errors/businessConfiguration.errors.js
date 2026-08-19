import { AppError, ErrorCodes, HTTP_STATUS } from "../../../shared/index.js";

export class BusinessConfigurationError extends AppError {
	constructor(
		message,
		statusCode = HTTP_STATUS.BAD_REQUEST,
		errorCode = ErrorCodes.BAD_REQUEST,
	) {
		super(message, statusCode, errorCode);

		this.name = this.constructor.name;
	}
}

export class BusinessConfigurationAlreadyExistsError extends BusinessConfigurationError {
	constructor(businessId) {
		super(
			`Business "${businessId}" already has a configuration.`,
			HTTP_STATUS.CONFLICT,
			ErrorCodes.CONFLICT,
		);

		this.businessId = businessId;
	}
}

export class BusinessConfigurationNotFoundError extends BusinessConfigurationError {
	constructor(businessId) {
		super(
			`Business "${businessId}" does not have a configuration.`,
			HTTP_STATUS.NOT_FOUND,
			ErrorCodes.NOT_FOUND,
		);

		this.businessId = businessId;
	}
}

export class UnknownBusinessTypeError extends BusinessConfigurationError {
	constructor(businessType) {
		super(
			`Unknown business type "${businessType}".`,
			HTTP_STATUS.BAD_REQUEST,
			ErrorCodes.BAD_REQUEST,
		);

		this.businessType = businessType;
	}
}

export class RegistryValidationError extends BusinessConfigurationError {
	constructor(message) {
		super(
			message,
			HTTP_STATUS.INTERNAL_SERVER_ERROR,
			ErrorCodes.INTERNAL_SERVER_ERROR,
		);
	}
}
