import sharedLifecycle from "./shared/offering.lifecycle.js";

import { digitalDownloadRepository } from "../../commerce/repositories/index.js";

function getProjection(context) {
	return context.registration.projection;
}

async function loadProjection(context) {
	if (context.digitalDownload) {
		return context.digitalDownload;
	}

	context.digitalDownload = await getProjection(context).find(
		context.offering.id,
	);

	return context.digitalDownload;
}

const hooks = {
	...sharedLifecycle.hooks,

	async afterCreate(context) {
		context.digitalDownload = await getProjection(context).create(context);
	},

	async beforeUpdate(context) {
		await loadProjection(context);
	},

	async afterUpdate(context) {
		await getProjection(context).update(context);
	},

	async beforeArchive(context) {
		await loadProjection(context);
	},

	async afterArchive(context) {
		await getProjection(context).archive(context);
	},

	async beforeRestore(context) {
		await loadProjection(context);
	},

	async afterRestore(context) {
		await getProjection(context).restore(context);
	},
};

export default {
	...sharedLifecycle,

	hooks,

	create(payload) {
		return sharedLifecycle.create({
			...payload,
			registration: {
				...payload.registration,
				lifecycle: { hooks },
			},
		});
	},

	update(payload) {
		return sharedLifecycle.update({
			...payload,
			registration: {
				...payload.registration,
				lifecycle: { hooks },
			},
		});
	},

	list: sharedLifecycle.list,

	get: sharedLifecycle.get,

	archive(payload) {
		return sharedLifecycle.archive({
			...payload,
			registration: {
				...payload.registration,
				lifecycle: { hooks },
			},
		});
	},

	restore(payload) {
		return sharedLifecycle.restore({
			...payload,
			registration: {
				...payload.registration,
				lifecycle: { hooks },
			},
		});
	},
};
