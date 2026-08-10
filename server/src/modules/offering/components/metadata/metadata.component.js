import componentContract from "../component.contract.js";

import metadataSchema from "./validators/metadata.schema.js";

export const metadataComponent = {
	...componentContract,

	validateCreate(context) {
		if (context.data.metadata === undefined) {
			return;
		}

		metadataSchema.parse(context.data.metadata);
	},

	validateUpdate(context) {
		if (context.data.metadata === undefined) {
			return;
		}

		metadataSchema.parse(context.data.metadata);
	},
};

export default metadataComponent;
