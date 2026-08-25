import componentContract from "../component.contract.js";

import { membershipService } from "./services/index.js";

import { setMembershipSchema } from "./validators/index.js";

export const membershipComponent = {
	...componentContract,

	validateCreate(context) {
		if (!context.data?.membership) {
			return;
		}

		setMembershipSchema.parse(context.data.membership);
	},

	validateUpdate(context) {
		if (!context.data?.membership) {
			return;
		}

		setMembershipSchema.parse(context.data.membership);
	},

	async afterCreate(context) {
		const { businessId, offering, data, actor, requestMetadata, state } =
			context;

		if (!data?.membership) {
			return;
		}

		const membership = await membershipService.setMembership({
			businessId,
			offeringId: offering.id,
			data: data.membership,
			actor,
			requestMetadata,
		});

		state.membership = membership;
	},

	async afterUpdate(context) {
		const { businessId, offering, data, actor, requestMetadata, state } =
			context;

		if (!data?.membership) {
			return;
		}

		const membership = await membershipService.setMembership({
			businessId,
			offeringId: offering.id,
			data: data.membership,
			actor,
			requestMetadata,
		});

		state.membership = membership;
	},
};

export default membershipComponent;
