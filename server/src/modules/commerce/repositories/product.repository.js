/**
 * Do not remove the commented block till further notice.
 */
// import Product from "../models/Product.js";

// const create = async (payload) => {
// 	return Product.create(payload);
// };

// const findById = async (id) => {
// 	return Product.findById(id);
// };

// const findByBusinessAndId = async (businessId, productId) => {
// 	return Product.findOne({
// 		_id: productId,
// 		business: businessId,
// 	});
// };

// const findByOffering = async (offeringId) => {
// 	return Product.findOne({
// 		offering: offeringId,
// 	});
// };

// const findByOfferingAndBusiness = async (businessId, offeringId) => {
// 	return Product.findOne({
// 		business: businessId,
// 		offering: offeringId,
// 	});
// };

// const findBySlug = async (businessId, slug) => {
// 	return Product.findOne({
// 		business: businessId,
// 		slug,
// 	});
// };

// const findByBusinessAndName = async (businessId, name, excludeId = null) => {
// 	const query = {
// 		business: businessId,
// 		name,
// 	};

// 	if (excludeId) {
// 		query._id = { $ne: excludeId };
// 	}

// 	return Product.findOne(query);
// };

// const findByBusinessAndSku = async (businessId, sku, excludeId = null) => {
// 	if (!sku) return null;

// 	const query = {
// 		business: businessId,
// 		sku,
// 	};

// 	if (excludeId) {
// 		query._id = { $ne: excludeId };
// 	}

// 	return Product.findOne(query);
// };

// const findByBusiness = async (
// 	businessId,
// 	{ status, search, page = 1, limit = 20, sort = { createdAt: -1 } } = {},
// ) => {
// 	const query = {
// 		business: businessId,
// 	};

// 	if (status) {
// 		query.status = status;
// 	}

// 	if (search) {
// 		query.$or = [
// 			{
// 				name: {
// 					$regex: search,
// 					$options: "i",
// 				},
// 			},
// 			{
// 				sku: {
// 					$regex: search,
// 					$options: "i",
// 				},
// 			},
// 		];
// 	}

// 	const skip = (page - 1) * limit;

// 	const [products, total] = await Promise.all([
// 		Product.find(query).sort(sort).skip(skip).limit(limit),
// 		Product.countDocuments(query),
// 	]);

// 	return {
// 		products,
// 		total,
// 		page,
// 		limit,
// 		totalPages: Math.ceil(total / limit),
// 	};
// };

// const save = async (product) => {
// 	return product.save();
// };

// const existsByBusinessAndSlug = async (businessId, slug, excludeId = null) => {
// 	const query = {
// 		business: businessId,
// 		slug,
// 	};

// 	if (excludeId) {
// 		query._id = { $ne: excludeId };
// 	}

// 	return Product.exists(query);
// };

// export default {
// 	create,
// 	findById,
// 	findByBusinessAndId,

// 	findByOffering,
// 	findByOfferingAndBusiness,

// 	findBySlug,
// 	findByBusinessAndName,
// 	findByBusinessAndSku,
// 	findByBusiness,
// 	save,
// 	existsByBusinessAndSlug,
// };

// // ...

import Product from "../models/Product.js";

/*
|--------------------------------------------------------------------------
| Shared Populate
|--------------------------------------------------------------------------
*/

const OFFERING_POPULATE = {
	path: "offering",
};

/*
|--------------------------------------------------------------------------
| CRUD
|--------------------------------------------------------------------------
*/

const create = async (payload) => {
	return Product.create(payload);
};

const findById = async (id) => {
	return Product.findById(id).populate(OFFERING_POPULATE);
};

const findByBusinessAndId = async (businessId, productId) => {
	return Product.findOne({
		_id: productId,
		business: businessId,
	}).populate(OFFERING_POPULATE);
};

const findByOffering = async (offeringId) => {
	return Product.findOne({
		offering: offeringId,
	}).populate(OFFERING_POPULATE);
};

const findByOfferingAndBusiness = async (businessId, offeringId) => {
	return Product.findOne({
		business: businessId,
		offering: offeringId,
	}).populate(OFFERING_POPULATE);
};

const findByBusinessAndSku = async (businessId, sku, excludeId = null) => {
	if (!sku) {
		return null;
	}

	const query = {
		business: businessId,
		sku,
	};

	if (excludeId) {
		query._id = { $ne: excludeId };
	}

	return Product.findOne(query).populate(OFFERING_POPULATE);
};

const findByBusiness = async (
	businessId,
	{ page = 1, limit = 20, sort = { createdAt: -1 } } = {},
) => {
	const query = {
		business: businessId,
	};

	const skip = (page - 1) * limit;

	const [products, total] = await Promise.all([
		Product.find(query)
			.populate(OFFERING_POPULATE)
			.sort(sort)
			.skip(skip)
			.limit(limit),

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

export default {
	create,

	findById,
	findByBusinessAndId,

	findByOffering,
	findByOfferingAndBusiness,

	findByBusinessAndSku,
	findByBusiness,

	save,
};
