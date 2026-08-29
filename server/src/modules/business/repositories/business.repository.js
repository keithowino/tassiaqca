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

async function findActiveForMarketplace({
	search,
	businessType,
	skip = 0,
	limit = 20,
} = {}) {
	const filter = {
		active: true,
	};

	if (businessType) {
		filter.businessType = businessType;
	}

	if (search) {
		filter.$or = [
			{
				name: {
					$regex: search,
					$options: "i",
				},
			},
			{
				description: {
					$regex: search,
					$options: "i",
				},
			},
		];
	}

	const [data, total] = await Promise.all([
		Business.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
		Business.countDocuments(filter),
	]);

	return {
		data,
		total,
	};
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

	findActiveForMarketplace,
};
