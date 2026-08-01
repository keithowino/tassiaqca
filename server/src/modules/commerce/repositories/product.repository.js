import Product from "../models/Product.js";

const create = async (payload) => {
	return Product.create(payload);
};

const findById = async (id) => {
	return Product.findById(id);
};

const findByBusinessAndId = async (businessId, productId) => {
	return Product.findOne({
		_id: productId,
		business: businessId,
	});
};

const findBySlug = async (businessId, slug) => {
	return Product.findOne({
		business: businessId,
		slug,
	});
};

const findByBusinessAndName = async (businessId, name, excludeId = null) => {
	const query = {
		business: businessId,
		name,
	};

	if (excludeId) {
		query._id = { $ne: excludeId };
	}

	return Product.findOne(query);
};

const findByBusinessAndSku = async (businessId, sku, excludeId = null) => {
	if (!sku) return null;

	const query = {
		business: businessId,
		sku,
	};

	if (excludeId) {
		query._id = { $ne: excludeId };
	}

	return Product.findOne(query);
};

const findByBusiness = async (
	businessId,
	{ status, search, page = 1, limit = 20, sort = { createdAt: -1 } } = {},
) => {
	const query = {
		business: businessId,
	};

	if (status) {
		query.status = status;
	}

	if (search) {
		query.$or = [
			{
				name: {
					$regex: search,
					$options: "i",
				},
			},
			{
				sku: {
					$regex: search,
					$options: "i",
				},
			},
		];
	}

	const skip = (page - 1) * limit;

	const [products, total] = await Promise.all([
		Product.find(query).sort(sort).skip(skip).limit(limit),
		Product.countDocuments(query),
	]);

	return {
		products,
		total,
		page,
		limit,
		totalPages: Math.ceil(total / limit),
	};
};

const save = async (product) => {
	return product.save();
};

const existsByBusinessAndSlug = async (businessId, slug, excludeId = null) => {
	const query = {
		business: businessId,
		slug,
	};

	if (excludeId) {
		query._id = { $ne: excludeId };
	}

	return Product.exists(query);
};

export default {
	create,
	findById,
	findByBusinessAndId,
	findBySlug,
	findByBusinessAndName,
	findByBusinessAndSku,
	findByBusiness,
	save,
	existsByBusinessAndSlug,
};
