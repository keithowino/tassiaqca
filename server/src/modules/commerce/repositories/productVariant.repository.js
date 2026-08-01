import { PRODUCT_VARIANT_POPULATE } from "../../../shared/database/index.js";
import ProductVariant from "../models/ProductVariant.js";

/*
|--------------------------------------------------------------------------
| Create / Update
|--------------------------------------------------------------------------
*/

async function create(data, session = null) {
	const [variant] = await ProductVariant.create([data], {
		session,
	});

	return variant;
}

async function save(variant, session = null) {
	return variant.save({
		session,
	});
}

async function remove(variant, session = null) {
	return variant.deleteOne({
		session,
	});
}

/*
|--------------------------------------------------------------------------
| Find One
|--------------------------------------------------------------------------
*/

async function findById(id) {
	return ProductVariant.findById(id).populate(PRODUCT_VARIANT_POPULATE);
}

async function findByBusinessAndId(businessId, variantId) {
	return ProductVariant.findOne({
		_id: variantId,
		business: businessId,
	}).populate(PRODUCT_VARIANT_POPULATE);
}

async function findByBusinessAndSku(businessId, sku) {
	return ProductVariant.findOne({
		business: businessId,
		sku,
	});
}

async function findByBusinessAndSlug(businessId, slug) {
	return ProductVariant.findOne({
		business: businessId,
		slug,
	});
}

async function findByBusinessProductAndAttributeSignature(
	businessId,
	productId,
	attributeSignature,
) {
	return ProductVariant.findOne({
		business: businessId,
		product: productId,
		attributeSignature,
	});
}

/*
|--------------------------------------------------------------------------
| Collections
|--------------------------------------------------------------------------
*/

async function findByBusinessAndProduct(businessId, productId, options = {}) {
	const { status, sort = "sku" } = options;

	const filter = {
		business: businessId,
		product: productId,
	};

	if (status) {
		filter.status = status;
	}

	return ProductVariant.find(filter)
		.sort(sort)
		.populate(PRODUCT_VARIANT_POPULATE);
}

async function listByBusiness(businessId, query) {
	const { page = 1, limit = 20, productId, status, sort = "sku" } = query;

	const filter = {
		business: businessId,
	};

	if (productId) {
		filter.product = productId;
	}

	if (status) {
		filter.status = status;
	}

	const skip = (page - 1) * limit;

	const [data, total] = await Promise.all([
		ProductVariant.find(filter)
			.sort(sort)
			.skip(skip)
			.limit(limit)
			.populate(PRODUCT_VARIANT_POPULATE),

		ProductVariant.countDocuments(filter),
	]);

	return {
		data,
		pagination: {
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit),
		},
	};
}

export default {
	create,
	save,
	remove,

	findById,
	findByBusinessAndId,
	findByBusinessAndSku,
	findByBusinessAndSlug,
	findByBusinessProductAndAttributeSignature,
	findByBusinessAndProduct,

	listByBusiness,
};
