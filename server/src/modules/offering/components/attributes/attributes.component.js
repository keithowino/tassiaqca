import componentContract from "../component.contract.js";

import attributesSchema from "./validators/attributes.schema.js";

/**
 * Normalize an individual attribute.
 *
 * Attribute names and values retain their display casing, but
 * surrounding whitespace is removed.
 *
 * Duplicate values are removed case-insensitively.
 */
function normalizeAttribute(attribute) {
	const name = attribute.name.trim();

	const values = [];
	const seen = new Set();

	for (const value of attribute.values) {
		const normalizedValue = value.trim();
		const key = normalizedValue.toLowerCase();

		if (seen.has(key)) {
			continue;
		}

		seen.add(key);
		values.push(normalizedValue);
	}

	return {
		name,
		values,
	};
}

/**
 * Normalize the complete attribute collection.
 *
 * Attribute names are unique case-insensitively.
 *
 * Example:
 *
 * Color
 * color
 *
 * becomes one attribute definition.
 */
function normalizeAttributes(attributes = []) {
	const normalized = [];
	const seen = new Set();

	for (const attribute of attributes) {
		const normalizedAttribute = normalizeAttribute(attribute);
		const key = normalizedAttribute.name.toLowerCase();

		if (seen.has(key)) {
			continue;
		}

		seen.add(key);
		normalized.push(normalizedAttribute);
	}

	return normalized;
}

export const attributesComponent = {
	...componentContract,

	validateCreate(context) {
		if (context.data.attributes === undefined) {
			return;
		}

		attributesSchema.parse(context.data.attributes);
	},

	validateUpdate(context) {
		if (context.data.attributes === undefined) {
			return;
		}

		attributesSchema.parse(context.data.attributes);
	},

	beforeCreate(context) {
		if (context.data.attributes === undefined) {
			return;
		}

		context.data.attributes = normalizeAttributes(context.data.attributes);
	},

	beforeUpdate(context) {
		if (context.data.attributes === undefined) {
			return;
		}

		context.data.attributes = normalizeAttributes(context.data.attributes);
	},
};

export default attributesComponent;
