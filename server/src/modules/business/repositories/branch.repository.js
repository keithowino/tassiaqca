import Branch from "../models/Branch.js";

async function create(data) {
	return Branch.create(data);
}

async function save(branch) {
	return branch.save();
}

async function findById(id) {
	return Branch.findById(id);
}

async function findByBusiness(businessId) {
	return Branch.find({
		business: businessId,
	});
}

async function findByBusinessAndId(businessId, branchId) {
	return Branch.findOne({
		_id: branchId,
		business: businessId,
	});
}

async function findByBusinessAndSlug(businessId, slug) {
	return Branch.findOne({
		business: businessId,
		slug,
	});
}

async function findHeadOffice(businessId) {
	return Branch.findOne({
		business: businessId,
		isHeadOffice: true,
		active: true,
	});
}

async function findActiveByBusiness(businessId) {
	return Branch.find({
		business: businessId,
		active: true,
	}).sort({
		isHeadOffice: -1,
		name: 1,
	});
}

export default {
	create,
	save,
	findById,
	findByBusiness,
	findActiveByBusiness,
	findByBusinessAndId,
	findByBusinessAndSlug,
	findHeadOffice,
};
