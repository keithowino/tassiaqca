import componentContract from "../component.contract.js";

import { capacityService } from "./services/index.js";
import { setCapacitySchema } from "./validators/index.js";

export const capacityComponent = {
	...componentContract,

	validateCreate(context) {
		if (context.data.capacity === undefined) {
			return;
		}

		setCapacitySchema.parse(context.data.capacity);
	},

	validateUpdate(context) {
		if (context.data.capacity === undefined) {
			return;
		}

		setCapacitySchema.parse(context.data.capacity);
	},

	async afterCreate(context) {
		const { businessId, offering, data, actor, requestMetadata, state } =
			context;

		if (data.capacity === undefined) {
			return;
		}

		const capacity = await capacityService.setCapacity({
			businessId,
			offeringId: offering.id,
			data: data.capacity,
			actor,
			requestMetadata,
		});

		state.capacity = capacity;
	},

	async afterUpdate(context) {
		const { businessId, offering, data, actor, requestMetadata, state } =
			context;

		if (data.capacity === undefined) {
			return;
		}

		const capacity = await capacityService.setCapacity({
			businessId,
			offeringId: offering.id,
			data: data.capacity,
			actor,
			requestMetadata,
		});

		state.capacity = capacity;
	},
};

export default capacityComponent;
