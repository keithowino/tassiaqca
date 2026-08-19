import {
	AppError,
	ErrorCodes,
	HTTP_STATUS,
} from "../../../../../shared/index.js";

/**
 * Normalizes an individual attribute.
 *
 * Attribute names and values retain their display casing,
 * while surrounding whitespace is removed.
 *
 * Duplicate values are removed case-insensitively.
 */
export function normalizeAttribute(attribute) {
	const name = attribute.name.trim();

	const values = [];
	const seenValues = new Set();

	for (const value of attribute.values) {
		const normalizedValue = value.trim();
		const key = normalizedValue.toLowerCase();

		if (seenValues.has(key)) {
			continue;
		}

		seenValues.add(key);
		values.push(normalizedValue);
	}

	return {
		name,
		values,
	};
}

/**
 * Normalizes the complete attribute collection.
 *
 * Attribute names must be unique case-insensitively.
 *
 * Example:
 *
 * Color
 * color
 *
 * is rejected rather than silently discarded.
 */
export function normalizeAttributes(attributes = []) {
	const normalized = [];
	const seenNames = new Set();

	for (const attribute of attributes) {
		const normalizedAttribute = normalizeAttribute(attribute);
		const key = normalizedAttribute.name.toLowerCase();

		if (seenNames.has(key)) {
			throw new AppError(
				`Duplicate attribute name "${normalizedAttribute.name}".`,
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.BAD_REQUEST,
			);
		}

		seenNames.add(key);
		normalized.push(normalizedAttribute);
	}

	return normalized;
}

export default {
	normalizeAttribute,
	normalizeAttributes,
};
