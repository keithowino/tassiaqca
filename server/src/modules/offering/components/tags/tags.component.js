import componentContract from "../component.contract.js";

import tagsSchema from "./validators/tags.schema.js";

function normalizeTags(tags = []) {
	return [...new Set(tags.map((tag) => tag.trim().toLowerCase()))];
}

export const tagsComponent = {
	...componentContract,

	validateCreate(context) {
		if (context.data.tags === undefined) {
			return;
		}

		tagsSchema.parse(context.data.tags);
	},

	validateUpdate(context) {
		if (context.data.tags === undefined) {
			return;
		}

		tagsSchema.parse(context.data.tags);
	},

	beforeCreate(context) {
		if (context.data.tags === undefined) {
			return;
		}

		context.data.tags = normalizeTags(context.data.tags);
	},

	beforeUpdate(context) {
		if (context.data.tags === undefined) {
			return;
		}

		context.data.tags = normalizeTags(context.data.tags);
	},
};

export default tagsComponent;
