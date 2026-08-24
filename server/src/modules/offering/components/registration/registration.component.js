import componentContract from "../component.contract.js";

import { registrationService } from "./services/index.js";

import { setRegistrationSchema } from "./validators/index.js";

const registrationComponent = {
	...componentContract,

	validateCreate(context) {
		if (context.data.registration === undefined) {
			return;
		}

		setRegistrationSchema.parse(context.data.registration);
	},

	validateUpdate(context) {
		if (context.data.registration === undefined) {
			return;
		}

		setRegistrationSchema.parse(context.data.registration);
	},

	async afterCreate(context) {
		if (context.data.registration === undefined) {
			return;
		}

		const registration = await registrationService.setRegistration({
			businessId: context.businessId,
			offeringId: context.offering.id,
			data: context.data.registration,
			actor: context.actor,
			requestMetadata: context.requestMetadata,
		});

		context.state.registration = registration;
	},

	async afterUpdate(context) {
		if (context.data.registration === undefined) {
			return;
		}

		const registration = await registrationService.setRegistration({
			businessId: context.businessId,
			offeringId: context.offering.id,
			data: context.data.registration,
			actor: context.actor,
			requestMetadata: context.requestMetadata,
		});

		context.state.registration = registration;
	},
};

export default registrationComponent;
