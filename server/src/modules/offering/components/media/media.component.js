import componentContract from "../component.contract.js";

import mediaSchema from "./validators/media.schema.js";
import { mediaService } from "./services/index.js";

function prepareMedia(media = []) {
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

		context.data.media = prepareMedia(context.data.media);
	},

	beforeUpdate(context) {
		if (context.data.media === undefined) {
			return;
		}

		context.data.media = prepareMedia(context.data.media);
	},

	async afterCreate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data.media === undefined) {
			return;
		}

		const media = await mediaService.setMedia({
			businessId,
			offeringId: offering.id,
			media: data.media,
			actor,
		});

		state.media = media;
	},

	async afterUpdate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data.media === undefined) {
			return;
		}

		const media = await mediaService.setMedia({
			businessId,
			offeringId: offering.id,
			media: data.media,
			actor,
		});

		state.media = media;
	},
};

export default mediaComponent;
