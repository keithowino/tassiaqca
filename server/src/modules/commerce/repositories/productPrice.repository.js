import { PRODUCT_PRICE_POPULATE } from "../../../shared/database/index.js";
import ProductPrice from "../models/ProductPrice.js";

async function create(data, session = null) {
	const [price] = await ProductPrice.create([data], {
		session,
	});

	return price;
}

async function save(price, session = null) {
	return price.save({
		session,
	});
}

async function findById(id) {
	return ProductPrice.findById(id).populate(PRODUCT_PRICE_POPULATE);
}

async function findByBusinessAndId(businessId, priceId) {
	return ProductPrice.findOne({
		_id: priceId,
		business: businessId,
	}).populate(PRODUCT_PRICE_POPULATE);
}

async function findCurrentByProduct(productId) {
	return ProductPrice.findOne({
		product: productId,
		isCurrent: true,
	}).populate(PRODUCT_PRICE_POPULATE);
}

async function listByBusiness(businessId, query) {
	const {
		page = 1,
		limit = 20,
		productId,
		currency,
		isCurrent,
		sort = "-effectiveFrom",
	} = query;

	const filter = {
		business: businessId,
	};

	if (productId) {
		filter.product = productId;
	}

	if (currency) {
		filter.currency = currency;
	}

	if (typeof isCurrent === "boolean") {
		filter.isCurrent = isCurrent;
	}

	const skip = (page - 1) * limit;

	const [data, total] = await Promise.all([
		ProductPrice.find(filter)
			.sort(sort)
			.skip(skip)
			.limit(limit)
			.populate(PRODUCT_PRICE_POPULATE),

		ProductPrice.countDocuments(filter),
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
/**
 * #### Cleared till further notice
 */
// /**
//  * #### Current Price Management
//  * Marks every current price for the product as historical.
//  * Used immediately before creating the next current price.
//  */
// async function clearCurrentPrice(productId, session = null) {
// 	return ProductPrice.updateMany(
// 		{
// 			product: productId,
// 			isCurrent: true,
// 		},
// 		{
// 			$set: {
// 				isCurrent: false,
// 			},
// 		},
// 		{
// 			session,
// 		},
// 	);
// }

export default {
	create,
	save,

	findById,
	findByBusinessAndId,
	findCurrentByProduct,

	listByBusiness,

	// clearCurrentPrice,
};
