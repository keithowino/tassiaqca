import componentContract from "../component.contract.js";

import { downloadService } from "./services/index.js";

import { setDownloadSchema } from "./validators/index.js";

export const downloadComponent = {
	...componentContract,

	validateCreate(context) {
		if (context.data.download === undefined) {
			return;
		}

		setDownloadSchema.parse(context.data.download);
	},

	validateUpdate(context) {
		if (context.data.download === undefined) {
			return;
		}

		setDownloadSchema.parse(context.data.download);
	},

	async afterCreate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data?.download === undefined) {
			return;
		}

		const download = await downloadService.setDownload({
			businessId,
			offeringId: offering.id,
			data: data.download,
			actor,
		});

		state.download = download;
	},

	async afterUpdate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data?.download === undefined) {
			return;
		}

		const download = await downloadService.setDownload({
			businessId,
			offeringId: offering.id,
			data: data.download,
			actor,
		});

		state.download = download;
	},
};

export default downloadComponent;
