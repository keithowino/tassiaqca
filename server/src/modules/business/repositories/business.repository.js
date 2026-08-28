import { Business } from "../models/index.js";

async function create(businessData, options = {}) {
	return Business.create([businessData], options).then(
		([document]) => document,
	);
}

async function update(business, updates, options = {}) {
	Object.assign(business, updates);

	return business.save(options);
}

async function findById(id) {
	return Business.findById(id);
}

async function findByIds(ids) {
	return Business.find({
		_id: {
			$in: ids,
		},
	});
}

async function findBySlug(slug) {
	return Business.findOne({ slug });
}

async function save(business, options = {}) {
	return business.save(options);
}

async function existsByName(name) {
	return Business.exists({
		name,
	});
}

async function existsBySlug(slug) {
	return Business.exists({
		slug,
	});
}

export default {
	create,
	update,
	findById,
	findByIds,
	findBySlug,
	save,
	existsByName,
	existsBySlug,
};
