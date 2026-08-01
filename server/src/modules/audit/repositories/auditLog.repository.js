import AuditLog from "../models/AuditLog.js";

async function create(data, options = {}) {
	if (!options.session) {
		return AuditLog.create(data);
	}

	const [document] = await AuditLog.create([data], options);

	return document;
}

async function findByBusiness(businessId) {
	return AuditLog.find({
		business: businessId,
	})
		.sort({
			createdAt: -1,
		})
		.populate("actor");
}

async function findByEntity(entityType, entityId) {
	return AuditLog.find({
		entityType,
		entityId,
	})
		.sort({
			createdAt: -1,
		})
		.populate("actor");
}

export default {
	create,
	findByBusiness,
	findByEntity,
};
