import path from "node:path";
import crypto from "node:crypto";

import cloudinaryProvider from "./providers/cloudinary.provider.js";

import { STORAGE_PROVIDERS } from "../../constants/index.js";

/*
|--------------------------------------------------------------------------
| Private Helpers
|--------------------------------------------------------------------------
*/

function sanitizeFilename(filename) {
	return path
		.parse(filename)
		.name.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

function generateFilename(originalname) {
	const name = sanitizeFilename(originalname);

	const suffix = crypto.randomBytes(4).toString("hex");

	return `${name}-${suffix}`;
}

function buildProductFolder(productId) {
	return `tassiaqca/uploads/products/${productId}`;
}

/*
|--------------------------------------------------------------------------
| Public Service
|--------------------------------------------------------------------------
*/

async function uploadProductImage({ file, productId }) {
	const uploaded = await cloudinaryProvider.upload({
		buffer: file.buffer,

		folder: buildProductFolder(productId),

		filename: generateFilename(file.originalname),
	});

	return {
		url: uploaded.secure_url,

		storageKey: uploaded.public_id,

		storageProvider: STORAGE_PROVIDERS.CLOUDINARY,

		width: uploaded.width,

		height: uploaded.height,

		format: uploaded.format,

		bytes: uploaded.bytes,
	};
}

async function deleteProductImage(storageKey) {
	await cloudinaryProvider.destroy(storageKey);
}

export default {
	uploadProductImage,
	deleteProductImage,
};
