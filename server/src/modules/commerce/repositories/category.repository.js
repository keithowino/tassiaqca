import Category from "../models/Category.js";

async function create(data) {
	return Category.create(data);
}

async function findById(id) {
	return Category.findById(id).populate("parent");
}

async function findByBusinessAndId(businessId, categoryId) {
	return Category.findOne({
		_id: categoryId,
		business: businessId,
	}).populate("parent");
}

async function findByBusinessAndSlug(businessId, slug, excludeId = null) {
	const query = {
		business: businessId,
		slug,
	};

	if (excludeId) {
		query._id = {
			$ne: excludeId,
		};
	}

	return Category.findOne(query);
}

async function findByBusiness(businessId, filters = {}) {
	const query = {
		business: businessId,
	};

	if (filters.status) {
		query.status = filters.status;
	}

	if (filters.parent !== undefined) {
		query.parent = filters.parent;
	}

	return Category.find(query).sort({
		position: 1,
		name: 1,
	});
}

async function save(category) {
	return category.save();
}

async function existsByBusinessAndSlug(businessId, slug, excludeId = null) {
	const query = {
		business: businessId,
		slug,
	};

	if (excludeId) {
		query._id = {
			$ne: excludeId,
		};
	}

	return Boolean(await Category.exists(query));
}

export default {
	create,
	findById,
	findByBusinessAndId,
	findByBusinessAndSlug,
	findByBusiness,
	save,
	existsByBusinessAndSlug,
};
