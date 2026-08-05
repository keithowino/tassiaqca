import sharedLifecycle from "./shared/offering.lifecycle.js";

function getProjection(context) {
	return context.registration.projection;
}

async function loadProjection(context) {
	if (context.subscription) {
		return context.subscription;
	}

	context.subscription = await getProjection(context).find(
		context.offering.id,
	);

	return context.subscription;
}

const hooks = {
	...sharedLifecycle.hooks,

	async afterCreate(context) {
		context.subscription = await getProjection(context).create(context);
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
				lifecycle: { hooks },
				...payload.registration,
			},
		});
	},

	update(payload) {
		return sharedLifecycle.update({
			...payload,
			registration: {
				lifecycle: { hooks },
				...payload.registration,
			},
		});
	},

	list: sharedLifecycle.list,

	get: sharedLifecycle.get,

	archive(payload) {
		return sharedLifecycle.archive({
			...payload,
			registration: {
				lifecycle: { hooks },
				...payload.registration,
			},
		});
	},

	restore(payload) {
		return sharedLifecycle.restore({
			...payload,
			registration: {
				lifecycle: { hooks },
				...payload.registration,
			},
		});
	},
};
