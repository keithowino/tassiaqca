import componentContract from "../component.contract.js";

import mediaSchema from "./validators/media.schema.js";

function normalizeMedia(media = []) {
	return media.map((item, index) => ({
		...item,

		position: item.position ?? index,

		alt: item.alt?.trim() ?? "",

		title: item.title?.trim() ?? "",

		featured: item.featured ?? false,

		metadata: item.metadata ?? {},
	}));
}

export const mediaComponent = {
	...componentContract,

	validateCreate(context) {
		if (context.data.media === undefined) {
			return;
		}

		mediaSchema.parse(context.data.media);
	},

	validateUpdate(context) {
		if (context.data.media === undefined) {
			return;
		}

		mediaSchema.parse(context.data.media);
	},

	beforeCreate(context) {
		if (context.data.media === undefined) {
			return;
		}

		context.data.media = normalizeMedia(context.data.media);
	},

	beforeUpdate(context) {
		if (context.data.media === undefined) {
			return;
		}

		context.data.media = normalizeMedia(context.data.media);
	},
};

export default mediaComponent;
