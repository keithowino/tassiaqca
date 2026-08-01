import { PRODUCT_IMAGE_POPULATE } from "../../../shared/database/index.js";
import ProductImage from "../models/ProductImage.js";

/*
|--------------------------------------------------------------------------
| Create
|--------------------------------------------------------------------------
*/

async function create(data, session = null) {
	return ProductImage.create([data], { session }).then(
		([document]) => document,
	);
}

/*
|--------------------------------------------------------------------------
| Find
|--------------------------------------------------------------------------
*/

async function findById(id) {
	return ProductImage.findById(id);
}

async function findByBusinessAndId(businessId, imageId) {
	return ProductImage.findOne({
		_id: imageId,
		business: businessId,
	}).populate(PRODUCT_PRICE_POPULATE);
	// .populate("product")
	// .populate("createdBy", "firstName lastName email")
	// .populate("updatedBy", "firstName lastName email");
}

async function findByProduct(productId) {
	return ProductImage.find({
		product: productId,
	})
		.sort({
			sortOrder: 1,
			createdAt: 1,
		})
		.populate(PRODUCT_PRICE_POPULATE);
	// .populate("createdBy", "firstName lastName email")
	// .populate("updatedBy", "firstName lastName email");
}

async function findPrimaryByProduct(productId) {
	return ProductImage.findOne({
		product: productId,
		isPrimary: true,
	});
}

/*
|--------------------------------------------------------------------------
| List
|--------------------------------------------------------------------------
*/

async function listByBusiness(
	businessId,
	{ page = 1, limit = 20, productId, isPrimary, sort = "sortOrder" } = {},
) {
	const filter = {
		business: businessId,
	};

	if (productId) {
		filter.product = productId;
	}

	if (typeof isPrimary === "boolean") {
		filter.isPrimary = isPrimary;
	}

	const skip = (page - 1) * limit;

	const [data, total] = await Promise.all([
		ProductImage.find(filter)
			.populate(PRODUCT_PRICE_POPULATE)
			// .populate("product")
			// .populate("createdBy", "firstName lastName email")
			// .populate("updatedBy", "firstName lastName email")
			.sort({
				sortOrder: 1,
				createdAt: 1,
			})
			.skip(skip)
			.limit(limit),

		ProductImage.countDocuments(filter),
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

/*
|--------------------------------------------------------------------------
| Update Helpers
|--------------------------------------------------------------------------
*/

async function clearPrimaryImage(productId, session = null) {
	return ProductImage.updateMany(
		{
			product: productId,
			isPrimary: true,
		},
		{
			$set: {
				isPrimary: false,
			},
		},
		{
			session,
		},
	);
}

async function save(document, session = null) {
	return document.save({ session });
}

/*
|--------------------------------------------------------------------------
| Delete
|--------------------------------------------------------------------------
*/

async function remove(document, session = null) {
	return document.deleteOne({ session });
}

/*
|--------------------------------------------------------------------------
| Exports
|--------------------------------------------------------------------------
*/

export default {
	create,

	findById,
	findByBusinessAndId,
	findByProduct,
	findPrimaryByProduct,

	listByBusiness,

	clearPrimaryImage,
	save,
	remove,
};
