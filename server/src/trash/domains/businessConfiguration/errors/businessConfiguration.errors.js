export class BusinessConfigurationError extends Error {
	constructor(message) {
		super(message);

		this.name = this.constructor.name;
	}
}

export class BusinessConfigurationAlreadyExistsError extends BusinessConfigurationError {
	constructor(businessId) {
		super(`Business "${businessId}" already has a configuration.`);

		this.businessId = businessId;
	}
}

export class BusinessConfigurationNotFoundError extends BusinessConfigurationError {
	constructor(businessId) {
		super(`Business "${businessId}" does not have a configuration.`);

		this.businessId = businessId;
	}
}

export class UnknownBusinessTypeError extends BusinessConfigurationError {
	constructor(businessType) {
		super(`Unknown business type "${businessType}".`);

		this.businessType = businessType;
	}
}

export class RegistryValidationError extends BusinessConfigurationError {
	constructor(message) {
		super(message);
	}
}
