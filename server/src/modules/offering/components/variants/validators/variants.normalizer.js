import {
	slugify,
	AppError,
	ErrorCodes,
	HTTP_STATUS,
} from "../../../../../shared/index.js";

function normalizeVariantAttribute(attribute) {
	return {
		name: attribute.name.trim(),
		value: attribute.value.trim(),
	};
}

export function normalizeVariantAttributes(attributes = []) {
	const normalized = [];
	const seenNames = new Set();

	for (const attribute of attributes) {
		const normalizedAttribute = normalizeVariantAttribute(attribute);

		const key = normalizedAttribute.name.toLowerCase();

		if (seenNames.has(key)) {
			throw new AppError(
				`Duplicate variant attribute "${normalizedAttribute.name}".`,
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.BAD_REQUEST,
			);
		}

		seenNames.add(key);
		normalized.push(normalizedAttribute);
	}

	return normalized;
}

function normalizeSku(sku) {
	return sku.trim().toUpperCase();
}

function createSignature(attributes) {
	return [...attributes]
		.sort((a, b) =>
			a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
		)
		.map(
			(attribute) =>
				`${attribute.name.toLowerCase()}=${attribute.value.toLowerCase()}`,
		)
		.join("|");
}

export function normalizeVariant(variant) {
	const attributes = normalizeVariantAttributes(variant.attributes);

	const sku = normalizeSku(variant.sku);

	const attributeSignature = createSignature(attributes);

	const slug =
		slugify(variant.slug) ??
		attributeSignature.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

	return {
		...variant,
		sku,
		slug,
		attributes,
		attributeCount: attributes.length,
		attributeSignature,
	};
}

export function normalizeVariants(variants = []) {
	return variants.map(normalizeVariant);
}

export default {
	normalizeVariant,
	normalizeVariants,
	normalizeVariantAttributes,
};
