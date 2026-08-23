import componentContract from "../component.contract.js";

import { locationService } from "./services/index.js";
import { setLocationSchema } from "./validators/index.js";

export const locationComponent = {
	...componentContract,

	validateCreate(context) {
		if (context.data.location === undefined) {
			return;
		}

		setLocationSchema.parse(context.data.location);
	},

	validateUpdate(context) {
		if (context.data.location === undefined) {
			return;
		}

		setLocationSchema.parse(context.data.location);
	},

	async afterCreate(context) {
		const { businessId, offering, data, actor, requestMetadata, state } =
			context;

		if (data.location === undefined) {
			return;
		}

		const location = await locationService.setLocation({
			businessId,
			offeringId: offering.id,
			data: data.location,
			actor,
			requestMetadata,
		});

		state.location = location;
	},

	async afterUpdate(context) {
		const { businessId, offering, data, actor, requestMetadata, state } =
			context;

		if (data.location === undefined) {
			return;
		}

		const location = await locationService.setLocation({
			businessId,
			offeringId: offering.id,
			data: data.location,
			actor,
			requestMetadata,
		});

		state.location = location;
	},
};

export default locationComponent;
