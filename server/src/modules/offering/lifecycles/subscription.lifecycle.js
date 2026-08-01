import sharedLifecycle from "./shared/offering.lifecycle.js";

export default {
	create: sharedLifecycle.create,
	list: sharedLifecycle.list,
	get: sharedLifecycle.get,
	update: sharedLifecycle.update,
	archive: sharedLifecycle.archive,
	restore: sharedLifecycle.restore,
};
