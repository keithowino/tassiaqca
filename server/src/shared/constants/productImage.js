export const PRODUCT_IMAGE_STATUS = Object.freeze({
	ACTIVE: "ACTIVE",
	ARCHIVED: "ARCHIVED",
});

export const PRODUCT_IMAGE_STATUS_VALUES = Object.values(PRODUCT_IMAGE_STATUS);

export const STORAGE_PROVIDERS = Object.freeze({
	CLOUDINARY: "CLOUDINARY",
	S3: "S3",
	LOCAL: "LOCAL",
});

export const STORAGE_PROVIDER_VALUES = Object.values(STORAGE_PROVIDERS);

export default PRODUCT_IMAGE_STATUS;
