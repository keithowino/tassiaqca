import Business from "../models/Business.js";

async function create(businessData) {
	return Business.create(businessData);
}

async function update(business, updates) {
	Object.assign(business, updates);

	return business.save();
}

async function findById(id) {
	return Business.findById(id);
}

async function findBySlug(slug) {
	return Business.findOne({ slug });
}

async function save(business) {
	return business.save();
}

export default {
	create,
	update,
	findById,
	findBySlug,
	save,
};
