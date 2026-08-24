import componentContract from "../component.contract.js";

import { schedulingService } from "./services/index.js";

import { setSchedulingSchema } from "./validators/index.js";

const schedulingComponent = {
	...componentContract,

	validateCreate(context) {
		if (context.data.scheduling === undefined) {
			return;
		}

		setSchedulingSchema.parse(context.data.scheduling);
	},

	validateUpdate(context) {
		if (context.data.scheduling === undefined) {
			return;
		}

		setSchedulingSchema.parse(context.data.scheduling);
	},

	async afterCreate(context) {
		if (context.data.scheduling === undefined) {
			return;
		}

		const scheduling = await schedulingService.setScheduling({
			businessId: context.businessId,
			offeringId: context.offering.id,
			data: context.data.scheduling,
			actor: context.actor,
			requestMetadata: context.requestMetadata,
		});

		context.state.scheduling = scheduling;
	},

	async afterUpdate(context) {
		if (context.data.scheduling === undefined) {
			return;
		}

		const scheduling = await schedulingService.setScheduling({
			businessId: context.businessId,
			offeringId: context.offering.id,
			data: context.data.scheduling,
			actor: context.actor,
			requestMetadata: context.requestMetadata,
		});

		context.state.scheduling = scheduling;
	},
};

export default schedulingComponent;
