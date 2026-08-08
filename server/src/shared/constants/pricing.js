export const CURRENCIES = {
	KES: "KES",
	USD: "USD",
	UGX: "UGX",
	TZS: "TZS",
};

export const CURRENCY_VALUES = Object.freeze(Object.values(CURRENCIES));

export const OFFERING_PRICE_STATUS = {
	ACTIVE: "ACTIVE",
	INACTIVE: "INACTIVE",
	SCHEDULED: "SCHEDULED",
};

export const OFFERING_PRICE_STATUS_VALUES = Object.freeze(
	Object.values(OFFERING_PRICE_STATUS),
);

export const BILLING_MODELS = {
	ONE_TIME: "ONE_TIME",
	RECURRING: "RECURRING",
	PER_HOUR: "PER_HOUR",
	PER_DAY: "PER_DAY",
	PER_WEEK: "PER_WEEK",
	PER_MONTH: "PER_MONTH",
	PER_YEAR: "PER_YEAR",
};

export const BILLING_MODEL_VALUES = Object.freeze(
	Object.values(BILLING_MODELS),
);
