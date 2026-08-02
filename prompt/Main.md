- At this point the following responsibilities have successfully moved out of product.service.js:

✅ Product creation
✅ Product updates
✅ SKU normalization
✅ SKU uniqueness
✅ Archive synchronization
✅ Restore synchronization
✅ Offering→Product mapping

- The remaining product.service.js is now largely legacy CRUD code that predates the Offering architecture.
- We may now begin simplifying product.service.js by progressively delegating its persistence logic to the adapter or the new Offering flow while keeping the existing Commerce API intact.

- This raises the question aren't all offering dealings supposed to be handled in this path `~\server\src\modules\offering\`? We created the product before realizing that the offering framework was the correct path. I ask because now we have two documents:

```js
// offering

{
  "_id": {
    "$oid": "6a6eccbf520a6eb146c284cc"
  },
  "business": {
    "$oid": "6a6c7a15c4217e5be0e7c210"
  },
  "type": "PRODUCT",
  "slug": "dell-xps-15-gen-2",
  "name": "Dell XPS 15 Gen 2",
  "shortDescription": "Developer Laptop",
  "description": "Intel Core Ultra",
  "status": "ACTIVE",
  "visibility": "PUBLIC",
  "searchable": true,
  "featured": false,
  "createdBy": {
    "$oid": "6a68777c8614c3f8387f5dc8"
  },
  "updatedBy": {
    "$oid": "6a68777c8614c3f8387f5dc8"
  },
  "createdAt": {
    "$date": "2026-08-02T04:51:11.234Z"
  },
  "updatedAt": {
    "$date": "2026-08-02T05:10:06.643Z"
  },
  "__v": 0
}
```

```js
// Product

{
  "_id": {
    "$oid": "6a6eccbf520a6eb146c284cd"
  },
  "business": {
    "$oid": "6a6c7a15c4217e5be0e7c210"
  },
  "offering": {
    "$oid": "6a6eccbf520a6eb146c284cc"
  },
  "slug": "dell-xps-15-gen-2",
  "name": "Dell XPS 15 Gen 2",
  "shortDescription": "Developer Laptop",
  "description": "Intel Core Ultra",
  "sku": "DEV-200",
  "category": null,
  "status": "ACTIVE",
  "createdBy": {
    "$oid": "6a68777c8614c3f8387f5dc8"
  },
  "updatedBy": {
    "$oid": "6a68777c8614c3f8387f5dc8"
  },
  "createdAt": {
    "$date": "2026-08-02T04:51:11.365Z"
  },
  "updatedAt": {
    "$date": "2026-08-02T05:10:06.755Z"
  },
  "__v": 0
}
```

Two documents that are almost identical when probably only one document, the offering document could be able to handle this. It could be scripted to adopt to different kind of offering scenarios(That is my thought, on your end you might be seeing a bigger picture). We created the offering using this endpoint `POST http://localhost:5000/api/v1/businesses/{{businessId}}/offerings`, in a way if i am not wrong this endpoint `POST http://localhost:5000/api/v1/businesses/{{businessId}}/products` and the once connected to it have now been rendered obsolete. An offering was created without the use of `~\server\src\modules\commerce\controllers\product.controller.js`. We are no longer constrained to the previous "Product" only kind of thinking, we now have the offering framework that is going to handle different kind of offerings. We should discuss the way forward.

---

- In addition you mentioned that we may continuing the architectural migration by introducing an Offering Projection pattern.

Specifically:

    1. Create a generic projection contract (e.g. ProjectionAdapter or OfferingAdapter interface) that each offering type implements.
    2. Register adapters in the offering registry alongside the offering definition.
    3. Replace the Product-specific lifecycle imports with adapter resolution from the registry.

Before covering this you will have to explain what it entails.

---

Here is the current state of the following files:

```js
`~\server\src\modules\commerce\routes\product.routes.js`;

import { Router } from "express";
import { productController } from "../controllers/index.js";
import authenticate from "../../identity/middleware/authenticate.js";
import requirePermission from "../../identity/middleware/requirePermission.js";
import { Permissions } from "../../../shared/constants/index.js";

const router = Router({
	mergeParams: true,
});

router.post(
	"/",
	authenticate,
	requirePermission(Permissions.PRODUCT_CREATE),
	productController.create,
);

router.get(
	"/",
	authenticate,
	requirePermission(Permissions.PRODUCT_VIEW),
	productController.list,
);

router.get(
	"/:productId",
	authenticate,
	requirePermission(Permissions.PRODUCT_VIEW),
	productController.getById,
);

router.patch(
	"/:productId",
	authenticate,
	requirePermission(Permissions.PRODUCT_UPDATE),
	productController.update,
);

router.delete(
	"/:productId",
	authenticate,
	requirePermission(Permissions.PRODUCT_DELETE),
	productController.archive,
);

router.patch(
	"/:productId/restore",
	authenticate,
	requirePermission(Permissions.PRODUCT_UPDATE),
	productController.restore,
);

export default router;
```

```js
`~\server\src\modules\commerce\controllers\product.controller.js`;

import { success } from "../../../shared/utils/apiResponse.js";
import asyncHandler from "../../../shared/utils/asyncHandler.js";
import validateRequest from "../../../shared/validation/validateRequest.js";

import productService from "../services/product.service.js";

import {
	createProductBodySchema,
	updateProductBodySchema,
	listProductsQuerySchema,
	productParamsSchema,
} from "../validators/product.validator.js";

const create = asyncHandler(async (req, res) => {
	const { body } = validateRequest(
		{
			body: createProductBodySchema,
		},
		req,
	);

	const product = await productService.create({
		businessId: req.params.businessId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, product, "Product created successfully.");
});

const update = asyncHandler(async (req, res) => {
	const { body } = validateRequest(
		{
			body: updateProductBodySchema,
		},
		req,
	);

	const product = await productService.update({
		businessId: req.params.businessId,
		productId: req.params.productId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, product, "Product updated successfully.");
});

const list = asyncHandler(async (req, res) => {
	const { query } = validateRequest(
		{
			query: listProductsQuerySchema,
		},
		req,
	);

	const products = await productService.list({
		businessId: req.params.businessId,
		query,
	});

	return success(res, products, "Products retrieved successfully.");
});

const getById = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: productParamsSchema,
		},
		req,
	);

	const product = await productService.getById({
		businessId: params.businessId,
		productId: params.productId,
	});

	return success(res, product, "Product retrieved successfully.");
});

const archive = asyncHandler(async (req, res) => {
	validateRequest(
		{
			params: productParamsSchema,
		},
		req,
	);

	const product = await productService.archive({
		businessId: req.params.businessId,
		productId: req.params.productId,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, product, "Product archived successfully.");
});

const restore = asyncHandler(async (req, res) => {
	validateRequest(
		{
			params: productParamsSchema,
		},
		req,
	);

	const product = await productService.restore({
		businessId: req.params.businessId,
		productId: req.params.productId,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, product, "Product restored successfully.");
});

export default {
	create,
	update,
	list,
	getById,
	archive,
	restore,
};
```

```js
`~\server\src\modules\commerce\services\product.service.js`;

import productRepository from "../repositories/product.repository.js";
import productPresenter from "../presenters/product.presenter.js";
import businessRepository from "../../business/repositories/business.repository.js";
import { auditLogService } from "../../audit/index.js";
import slugify from "../../../shared/utils/slugify.js";
import {
	PRODUCT_STATUS,
	AUDIT_ACTIONS,
	AUDIT_ENTITY_TYPES,
	HTTP_STATUS,
} from "../../../shared/constants/index.js";
import { AppError, ErrorCodes } from "../../../shared/errors/index.js";

/*
|--------------------------------------------------------------------------
| Private Helpers
|--------------------------------------------------------------------------
*/

async function ensureBusinessExists(businessId) {
	const business = await businessRepository.findById(businessId);

	if (!business) {
		throw new AppError(
			"Business not found.",
			HTTP_STATUS.NOT_FOUND,
			ErrorCodes.NOT_FOUND,
		);
	}

	return business;
}

async function ensureProductExists(businessId, productId) {
	const product = await productRepository.findByBusinessAndId(
		businessId,
		productId,
	);

	if (!product) {
		throw new AppError(
			"Product not found.",
			HTTP_STATUS.NOT_FOUND,
			ErrorCodes.NOT_FOUND,
		);
	}

	return product;
}

async function ensureProductNameIsUnique(businessId, name, excludeId = null) {
	const existing = await productRepository.findByBusinessAndName(
		businessId,
		name,
		excludeId,
	);

	if (existing) {
		throw new AppError(
			"A product with this name already exists.",
			HTTP_STATUS.CONFLICT,
			ErrorCodes.CONFLICT,
		);
	}
}

// function normalizeSku(sku) {
// 	return sku?.trim().toUpperCase() ?? null;
// }

// async function ensureSkuIsUnique(businessId, sku, excludeId = null) {
// 	if (!sku) {
// 		return;
// 	}

// 	const existing = await productRepository.findByBusinessAndSku(
// 		businessId,
// 		sku,
// 		excludeId,
// 	);

// 	if (existing) {
// 		throw new AppError(
// 			"A product with this SKU already exists.",
// 			HTTP_STATUS.CONFLICT,
// 			ErrorCodes.CONFLICT,
// 		);
// 	}
// }

/**
 * No duplicate-key exceptions.
 */
async function generateUniqueSlug(businessId, name, excludeId = null) {
	const baseSlug = slugify(name);

	let slug = baseSlug;

	let counter = 2;

	while (
		await productRepository.existsByBusinessAndSlug(
			businessId,
			slug,
			excludeId,
		)
	) {
		slug = `${baseSlug}-${counter++}`;
	}

	return slug;
}

function buildAuditMetadata(product) {
	return {
		name: product.name,
		sku: product.sku,
		slug: product.slug,
		status: product.status,
	};
}

/*
|--------------------------------------------------------------------------
| Public Service
|--------------------------------------------------------------------------
*/

async function create({ businessId, data, actor, requestMetadata }) {
	await ensureBusinessExists(businessId);

	const name = data.name.trim();

	await ensureProductNameIsUnique(businessId, name);

	const sku = normalizeSku(data.sku);

	await ensureSkuIsUnique(businessId, sku);

	const slug = await generateUniqueSlug(businessId, name);

	const product = await productRepository.create({
		...data,
		business: businessId,
		name,
		sku,
		slug,
		createdBy: actor.id,
		updatedBy: actor.id,
	});

	await auditLogService.log({
		business: businessId,
		entityType: AUDIT_ENTITY_TYPES.PRODUCT,
		entityId: product.id,
		action: AUDIT_ACTIONS.PRODUCT_CREATED,
		actor,

		requestMetadata,

		metadata: buildAuditMetadata(product),
	});

	return productPresenter.present(product);
}

async function update({ businessId, productId, data, actor, requestMetadata }) {
	await ensureBusinessExists(businessId);

	const product = await ensureProductExists(businessId, productId);

	if (product.status === PRODUCT_STATUS.ARCHIVED) {
		throw new AppError(
			"Archived products cannot be updated.",
			HTTP_STATUS.BAD_REQUEST,
			ErrorCodes.BAD_REQUEST,
		);
	}

	if (data.name !== undefined) {
		const name = data.name.trim();

		if (name !== product.name) {
			await ensureProductNameIsUnique(businessId, name, product.id);

			product.slug = await generateUniqueSlug(
				businessId,
				name,
				product.id,
			);

			product.name = name;
		}
	}

	if (data.sku !== undefined) {
		const sku = normalizeSku(data.sku);

		if (sku !== product.sku) {
			await ensureSkuIsUnique(businessId, sku, product.id);

			product.sku = sku;
		}
	}

	if (data.shortDescription !== undefined) {
		product.shortDescription = data.shortDescription;
	}

	if (data.description !== undefined) {
		product.description = data.description;
	}

	if (data.categoryId !== undefined) {
		product.category = data.categoryId;
	}

	if (data.status !== undefined) {
		product.status = data.status;
	}

	product.updatedBy = actor.id;

	await productRepository.save(product);

	await auditLogService.log({
		business: businessId,
		entityType: AUDIT_ENTITY_TYPES.PRODUCT,
		entityId: product.id,
		action: AUDIT_ACTIONS.PRODUCT_UPDATED,
		actor,

		requestMetadata,

		metadata: buildAuditMetadata(product),
	});

	return productPresenter.present(product);
}

async function list({ businessId, query }) {
	await ensureBusinessExists(businessId);

	const result = await productRepository.findByBusiness(businessId, query);

	return productPresenter.presentCollection(result);
}

async function getById({ businessId, productId }) {
	await ensureBusinessExists(businessId);

	const product = await ensureProductExists(businessId, productId);

	return productPresenter.present(product);
}

async function archive({ businessId, productId, actor, requestMetadata }) {
	await ensureBusinessExists(businessId);

	const product = await ensureProductExists(businessId, productId);

	if (product.status === PRODUCT_STATUS.ARCHIVED) {
		throw new AppError(
			"Product is already archived.",
			HTTP_STATUS.BAD_REQUEST,
			ErrorCodes.BAD_REQUEST,
		);
	}

	product.status = PRODUCT_STATUS.ARCHIVED;

	product.updatedBy = actor.id;

	await productRepository.save(product);

	await auditLogService.log({
		business: businessId,
		entityType: AUDIT_ENTITY_TYPES.PRODUCT,
		entityId: product.id,
		action: AUDIT_ACTIONS.PRODUCT_ARCHIVED,
		actor,

		requestMetadata,

		metadata: buildAuditMetadata(product),
	});

	return productPresenter.present(product);
}

async function restore({ businessId, productId, actor, requestMetadata }) {
	await ensureBusinessExists(businessId);

	const product = await ensureProductExists(businessId, productId);

	if (product.status !== PRODUCT_STATUS.ARCHIVED) {
		throw new AppError(
			"Product is not archived.",
			HTTP_STATUS.BAD_REQUEST,
			ErrorCodes.BAD_REQUEST,
		);
	}

	product.status = PRODUCT_STATUS.ACTIVE;

	product.updatedBy = actor.id;

	await productRepository.save(product);

	await auditLogService.log({
		business: businessId,
		entityType: AUDIT_ENTITY_TYPES.PRODUCT,
		entityId: product.id,
		action: AUDIT_ACTIONS.PRODUCT_RESTORED,
		actor,

		requestMetadata,

		metadata: buildAuditMetadata(product),
	});

	return productPresenter.present(product);
}

export default {
	create,
	update,
	list,
	getById,
	archive,
	restore,
};
```

```js
`~\server\src\modules\commerce\repositories\product.repository.js`;

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

const findByOffering = async (offeringId) => {
	return Product.findOne({
		offering: offeringId,
	});
};

const findByOfferingAndBusiness = async (businessId, offeringId) => {
	return Product.findOne({
		business: businessId,
		offering: offeringId,
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

	findByOffering,
	findByOfferingAndBusiness,

	findBySlug,
	findByBusinessAndName,
	findByBusinessAndSku,
	findByBusiness,
	save,
	existsByBusinessAndSlug,
};
```

```js
`~\server\src\modules\offering\routes\offering.routes.js`;

import { Router } from "express";

import { offeringController } from "../controllers/index.js";

import authenticate from "../../identity/middleware/authenticate.js";
import requirePermission from "../../identity/middleware/requirePermission.js";

import { Permissions } from "../../../shared/constants/index.js";

const router = Router({
	mergeParams: true,
});

router.use(authenticate);

router
	.route("/")
	.get(
		requirePermission(Permissions.OFFERING_VIEW),
		offeringController.listOfferings,
	)
	.post(
		requirePermission(Permissions.OFFERING_CREATE),
		offeringController.createOffering,
	);

router
	.route("/:offeringId")
	.get(
		requirePermission(Permissions.OFFERING_VIEW),
		offeringController.getOffering,
	)
	.patch(
		requirePermission(Permissions.OFFERING_UPDATE),
		offeringController.updateOffering,
	);

router.patch(
	"/:offeringId/archive",
	requirePermission(Permissions.OFFERING_ARCHIVE),
	offeringController.archiveOffering,
);

router.patch(
	"/:offeringId/restore",
	requirePermission(Permissions.OFFERING_RESTORE),
	offeringController.restoreOffering,
);

export default router;
```

```js
`~\server\src\modules\offering\controllers\offering.controller.js`;

import { success } from "../../../shared/utils/apiResponse.js";
import asyncHandler from "../../../shared/utils/asyncHandler.js";
import { validateRequest } from "../../../shared/validation/index.js";

import { offeringService } from "../services/index.js";

import {
	businessParamsSchema,
	createOfferingRequestSchema,
	listOfferingsQuerySchema,
	offeringParamsSchema,
	updateOfferingRequestSchema,
} from "../validators/index.js";

const createOffering = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessParamsSchema,
			body: createOfferingRequestSchema,
		},
		req,
	);

	const offering = await offeringService.createOffering({
		businessId: params.businessId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, offering, "Offering created successfully.");
});

const listOfferings = asyncHandler(async (req, res) => {
	const { params, query } = validateRequest(
		{
			params: businessParamsSchema,
			query: listOfferingsQuerySchema,
		},
		req,
	);

	const offerings = await offeringService.listOfferings({
		businessId: params.businessId,
		query,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, offerings);
});

const getOffering = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: offeringParamsSchema,
		},
		req,
	);

	const offering = await offeringService.getOffering({
		businessId: params.businessId,
		offeringId: params.offeringId,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, offering);
});

const updateOffering = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: offeringParamsSchema,
			body: updateOfferingRequestSchema,
		},
		req,
	);

	const offering = await offeringService.updateOffering({
		businessId: params.businessId,
		offeringId: params.offeringId,
		data: body,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, offering, "Offering updated successfully.");
});

const archiveOffering = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: offeringParamsSchema,
		},
		req,
	);

	const offering = await offeringService.archiveOffering({
		businessId: params.businessId,
		offeringId: params.offeringId,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, offering, "Offering archived successfully.");
});

const restoreOffering = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: offeringParamsSchema,
		},
		req,
	);

	const offering = await offeringService.restoreOffering({
		businessId: params.businessId,
		offeringId: params.offeringId,
		actor: req.user,
		requestMetadata: req.requestMetadata,
	});

	return success(res, offering, "Offering restored successfully.");
});

export default {
	createOffering,
	listOfferings,
	getOffering,
	updateOffering,
	archiveOffering,
	restoreOffering,
};
```

```js
`~\server\src\modules\offering\services\offering.service.js`;

import lifecycleFactory from "../lifecycles/lifecycle.factory.js";
import { offeringRepository } from "../repositories/index.js";

/**
 * Delegation layer
 */

/**
|--------------------------------------------------
| Private helper functions
|--------------------------------------------------
*/

function lifecycleFor(payload) {
	return lifecycleFactory.resolveLifecycle(payload.data.type);
}

async function resolveExistingLifecycle({ businessId, offeringId }) {
	const offering = await offeringRepository.findByBusinessAndId(
		businessId,
		offeringId,
	);

	if (!offering) {
		return lifecycleFactory.resolveLifecycle("UNKNOWN");
	}

	return lifecycleFactory.resolveLifecycle(offering.type);
}

/**
|--------------------------------------------------
| Public functions
|--------------------------------------------------
*/

/**
 * The fallback to "PRODUCT" is only a transitional mechanism. For get, update, archive, and restore, the service does not yet know the offering type because it only receives an offeringId. In the next refinement, the resolver should determine the lifecycle by first loading the offering from the repository:
 */

// async function createOffering(payload) {
// 	const lifecycle = lifecycleRegistry.resolveLifecycle(payload.data.type);

// 	return lifecycle.create(payload);
// }

async function createOffering(payload) {
	return lifecycleFor(payload).create(payload);
}

// async function listOfferings(payload) {
// 	const lifecycle = lifecycleRegistry.resolveLifecycle(
// 		payload.query?.type ?? payload.type ?? "PRODUCT",
// 	);

// 	return lifecycle.list(payload);
// }

async function listOfferings(payload) {
	// shared for now
	return lifecycleFactory
		.resolveLifecycle(payload.query?.type ?? "PRODUCT")
		.list(payload);
}

// async function getOffering(payload) {
// 	// Placeholder until entity-based resolution is introduced.
// 	const lifecycle = lifecycleRegistry.resolveLifecycle(
// 		payload.type ?? "PRODUCT",
// 	);

// 	return lifecycle.get(payload);
// }

async function getOffering(payload) {
	const lifecycle = await resolveExistingLifecycle(payload);

	return lifecycle.get(payload);
}

// async function updateOffering(payload) {
// 	const lifecycle = lifecycleRegistry.resolveLifecycle(
// 		payload.data?.type ?? payload.type ?? "PRODUCT",
// 	);

// 	return lifecycle.update(payload);
// }

async function updateOffering(payload) {
	const lifecycle = await resolveExistingLifecycle(payload);

	return lifecycle.update(payload);
}

// async function archiveOffering(payload) {
// 	const lifecycle = lifecycleRegistry.resolveLifecycle(
// 		payload.type ?? "PRODUCT",
// 	);

// 	return lifecycle.archive(payload);
// }

async function archiveOffering(payload) {
	const lifecycle = await resolveExistingLifecycle(payload);

	return lifecycle.archive(payload);
}

// async function restoreOffering(payload) {
// 	const lifecycle = lifecycleRegistry.resolveLifecycle(
// 		payload.type ?? "PRODUCT",
// 	);

// 	return lifecycle.restore(payload);
// }

async function restoreOffering(payload) {
	const lifecycle = await resolveExistingLifecycle(payload);

	return lifecycle.restore(payload);
}

export default {
	createOffering,
	listOfferings,
	getOffering,
	updateOffering,
	archiveOffering,
	restoreOffering,
};
```

```js
`~\server\src\modules\offering\lifecycles\shared\offering.lifecycle.js`;

import { offeringRepository } from "../../repositories/index.js";
import { offeringPresenter } from "../../presenters/index.js";

import businessRepository from "../../../business/repositories/business.repository.js";
import { auditLogService } from "../../../audit/index.js";

import slugify from "../../../../shared/utils/slugify.js";

import {
	AUDIT_ACTIONS,
	AUDIT_ENTITY_TYPES,
	HTTP_STATUS,
} from "../../../../shared/constants/index.js";

import { OFFERING_STATUS } from "../../constants/index.js";

import { AppError, ErrorCodes } from "../../../../shared/errors/index.js";

import { offeringFactory } from "../../builders/index.js";

/**
 * This is the foundation for the next evolution. Once Product, Booking, Rental, Membership, Course, etc. become independent domains, each can provide its own lifecycle hooks (beforeCreate, afterCreate, beforeUpdate, publish, archive, pricing, inventory, scheduling, etc.) while continuing to reuse this shared lifecycle instead of duplicating CRUD logic.
 */

/*
|--------------------------------------------------------------------------
| Private Helpers
|--------------------------------------------------------------------------
*/

async function ensureBusinessExists(businessId) {
	const business = await businessRepository.findById(businessId);

	if (!business) {
		throw new AppError(
			"Business not found.",
			HTTP_STATUS.NOT_FOUND,
			ErrorCodes.NOT_FOUND,
		);
	}

	return business;
}

async function ensureOfferingExists(businessId, offeringId) {
	const offering = await offeringRepository.findByBusinessAndId(
		businessId,
		offeringId,
	);

	if (!offering) {
		throw new AppError(
			"Offering not found.",
			HTTP_STATUS.NOT_FOUND,
			ErrorCodes.NOT_FOUND,
		);
	}

	return offering;
}

async function ensureOfferingNameIsUnique(businessId, name, excludeId = null) {
	const existing = await offeringRepository.findByBusinessAndName(
		businessId,
		name,
		excludeId,
	);

	if (existing) {
		throw new AppError(
			"An offering with this name already exists.",
			HTTP_STATUS.CONFLICT,
			ErrorCodes.CONFLICT,
		);
	}
}

async function generateUniqueSlug(businessId, name, excludeId = null) {
	const baseSlug = slugify(name);

	let slug = baseSlug;

	let counter = 2;

	while (
		await offeringRepository.existsByBusinessAndSlug(
			businessId,
			slug,
			excludeId,
		)
	) {
		slug = `${baseSlug}-${counter++}`;
	}

	return slug;
}

function buildAuditMetadata(offering) {
	return {
		name: offering.name,
		type: offering.type,
		status: offering.status,
		visibility: offering.visibility,
		slug: offering.slug,
	};
}

/*
|--------------------------------------------------------------------------
| Lifecycle Hooks
|--------------------------------------------------------------------------
|
| Specialized lifecycles (Product, Rental, Booking, etc.) override these
| hooks to inject domain-specific behavior without duplicating the shared
| lifecycle implementation.
|
*/

const defaultHooks = {
	async beforeCreate() {},

	async afterCreate() {},

	async beforeUpdate() {},

	async afterUpdate() {},

	async beforeArchive() {},

	async afterArchive() {},

	async beforeRestore() {},

	async afterRestore() {},
};

/*
|--------------------------------------------------------------------------
| Lifecycle
|--------------------------------------------------------------------------
*/

async function create({
	businessId,
	data,
	actor,
	requestMetadata,
	hooks = defaultHooks,
}) {
	await ensureBusinessExists(businessId);

	const context = {
		businessId,
		data,
		actor,
		requestMetadata,
	};

	await hooks.beforeCreate(context);

	const name = data.name.trim();

	await ensureOfferingNameIsUnique(businessId, name);

	const slug = await generateUniqueSlug(businessId, name);

	const offering = await offeringRepository.create(
		offeringFactory.createOffering({
			businessId,
			data: {
				...data,
				name,
			},
			slug,
			actor,
		}),
	);

	context.offering = offering;

	await hooks.afterCreate(context);

	await auditLogService.log({
		business: businessId,
		entityType: AUDIT_ENTITY_TYPES.OFFERING,
		entityId: offering.id,
		action: AUDIT_ACTIONS.OFFERING_CREATED,
		actor,
		requestMetadata,
		metadata: buildAuditMetadata(offering),
	});

	return offeringPresenter.present(offering);
}

async function list({ businessId, query, hooks = defaultHooks }) {
	await ensureBusinessExists(businessId);

	const page = query.page ?? 1;
	const limit = query.limit ?? 20;

	const skip = (page - 1) * limit;

	const { data, total } = await offeringRepository.findByBusiness(
		businessId,
		{
			...query,
			skip,
			limit,
		},
	);

	return {
		data: offeringPresenter.presentCollection(data),

		pagination: {
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit),
		},
	};
}

async function get({ businessId, offeringId, hooks = defaultHooks }) {
	await ensureBusinessExists(businessId);

	const offering = await ensureOfferingExists(businessId, offeringId);

	return offeringPresenter.present(offering);
}

async function update({
	businessId,
	offeringId,
	data,
	actor,
	requestMetadata,
	hooks = defaultHooks,
}) {
	await ensureBusinessExists(businessId);

	const offering = await ensureOfferingExists(businessId, offeringId);

	const context = {
		businessId,
		offering,
		data,
		actor,
		requestMetadata,
	};

	await hooks.beforeUpdate(context);

	if (data.name) {
		const name = data.name.trim();

		if (name !== offering.name) {
			await ensureOfferingNameIsUnique(businessId, name, offering.id);

			offering.name = name;

			offering.slug = await generateUniqueSlug(
				businessId,
				name,
				offering.id,
			);
		}
	}

	Object.assign(offering, data);

	offering.updatedBy = actor.id;

	await offeringRepository.save(offering);

	await hooks.afterUpdate(context);

	await auditLogService.log({
		business: businessId,
		entityType: AUDIT_ENTITY_TYPES.OFFERING,
		entityId: offering.id,
		action: AUDIT_ACTIONS.OFFERING_UPDATED,
		actor,
		requestMetadata,
		metadata: buildAuditMetadata(offering),
	});

	return offeringPresenter.present(offering);
}

async function archive({
	businessId,
	offeringId,
	actor,
	requestMetadata,
	hooks = defaultHooks,
}) {
	await ensureBusinessExists(businessId);

	const offering = await ensureOfferingExists(businessId, offeringId);

	const context = {
		offering,
		actor,
		requestMetadata,
	};

	await hooks.beforeArchive(context);

	offering.status = OFFERING_STATUS.ARCHIVED;

	offering.updatedBy = actor.id;

	await offeringRepository.save(offering);

	await hooks.afterArchive(context);

	await auditLogService.log({
		business: businessId,
		entityType: AUDIT_ENTITY_TYPES.OFFERING,
		entityId: offering.id,
		action: AUDIT_ACTIONS.OFFERING_ARCHIVED,
		actor,
		requestMetadata,
		metadata: buildAuditMetadata(offering),
	});

	return offeringPresenter.present(offering);
}

async function restore({
	businessId,
	offeringId,
	actor,
	requestMetadata,
	hooks = defaultHooks,
}) {
	await ensureBusinessExists(businessId);

	const offering = await ensureOfferingExists(businessId, offeringId);

	const context = {
		offering,
		actor,
		requestMetadata,
	};

	await hooks.beforeRestore(context);

	offering.status = OFFERING_STATUS.ACTIVE;

	offering.updatedBy = actor.id;

	await offeringRepository.save(offering);

	await hooks.afterRestore(context);

	await auditLogService.log({
		business: businessId,
		entityType: AUDIT_ENTITY_TYPES.OFFERING,
		entityId: offering.id,
		action: AUDIT_ACTIONS.OFFERING_RESTORED,
		actor,
		requestMetadata,
		metadata: buildAuditMetadata(offering),
	});

	return offeringPresenter.present(offering);
}

export default {
	hooks: defaultHooks,

	create,
	list,
	get,
	update,
	archive,
	restore,
};
```

```js
`~\server\src\modules\offering\lifecycles\event.lifecycle.js`;

import sharedLifecycle from "./shared/offering.lifecycle.js";

export default {
	create: sharedLifecycle.create,
	list: sharedLifecycle.list,
	get: sharedLifecycle.get,
	update: sharedLifecycle.update,
	archive: sharedLifecycle.archive,
	restore: sharedLifecycle.restore,
};
```

```js
`~\server\src\modules\offering\lifecycles\product.lifecycle.js`;

import sharedLifecycle from "./shared/offering.lifecycle.js";
import productRepository from "../../commerce/repositories/product.repository.js";
import productAdapter from "../../commerce/adapters/product.adapter.js";
import { HTTP_STATUS } from "../../../shared/constants/index.js";
import { AppError, ErrorCodes } from "../../../shared/errors/index.js";

/**
|--------------------------------------------------
| Private helper
|--------------------------------------------------
*/

function normalizeSku(sku) {
	return sku?.trim().toUpperCase() ?? null;
}

async function ensureSkuIsUnique(businessId, sku, excludeId = null) {
	if (!sku) return;

	const existing = await productRepository.findByBusinessAndSku(
		businessId,
		sku,
		excludeId,
	);

	if (existing) {
		throw new AppError(
			"A product with this SKU already exists.",
			HTTP_STATUS.CONFLICT,
			ErrorCodes.CONFLICT,
		);
	}
}

async function loadProduct(context) {
	if (context.product) {
		return context.product;
	}

	context.product = await productAdapter.findByOffering(context.offering.id);

	return context.product;
}

const hooks = {
	...sharedLifecycle.hooks,

	async beforeCreate(context) {
		context.data.sku = normalizeSku(context.data.sku);

		await ensureSkuIsUnique(context.businessId, context.data.sku);
	},

	async afterCreate(context) {
		context.product = await productAdapter.createFromOffering(context);
	},

	async beforeUpdate(context) {
		await loadProduct(context);

		if (context.data.sku !== undefined) {
			context.data.sku = normalizeSku(context.data.sku);

			if (context.data.sku !== context.product?.sku) {
				await ensureSkuIsUnique(
					context.businessId,
					context.data.sku,
					context.product?.id,
				);
			}
		}
	},

	async afterUpdate(context) {
		await productAdapter.updateFromOffering(context);
	},

	async beforeArchive(context) {
		await loadProduct(context);
	},

	async afterArchive(context) {
		await productAdapter.archiveFromOffering(context);
	},

	async beforeRestore(context) {
		await loadProduct(context);
	},

	async afterRestore(context) {
		await productAdapter.restoreFromOffering(context);
	},
};

export default {
	...sharedLifecycle,

	hooks,

	create(payload) {
		return sharedLifecycle.create({
			...payload,
			hooks,
		});
	},

	update(payload) {
		return sharedLifecycle.update({
			...payload,
			hooks,
		});
	},

	list: sharedLifecycle.list,
	get: sharedLifecycle.get,

	archive(payload) {
		return sharedLifecycle.archive({
			...payload,
			hooks,
		});
	},

	restore(payload) {
		return sharedLifecycle.restore({
			...payload,
			hooks,
		});
	},
};
```

```bash
├── client/
│   └── ...
├── server/
│   │   ├── modules/
│   │   │   ├── commerce/
│   │   │   │   ├── adapters/
│   │   │   │   │   └── product.adapter.js
│   │   │   │   ├── controllers/
│   │   │   │   │   ├── category.controller.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── inventory.controller.js
│   │   │   │   │   ├── product.controller.js
│   │   │   │   │   ├── productImage.controller.js
│   │   │   │   │   ├── productPrice.controller.js
│   │   │   │   │   └── stockMovement.controller.js
│   │   │   │   ├── models/
│   │   │   │   │   ├── Inventory.js
│   │   │   │   │   ├── Product.js
│   │   │   │   │   ├── ProductCategory.js
│   │   │   │   │   ├── ProductImage.js
│   │   │   │   │   ├── ProductPrice.js
│   │   │   │   │   ├── ProductVariant.js
│   │   │   │   │   └── StockMovement.js
│   │   │   │   ├── presenters/
│   │   │   │   │   ├── category.presenter.js
│   │   │   │   │   ├── inventory.presenter.js
│   │   │   │   │   ├── product.presenter.js
│   │   │   │   │   ├── productImage.presenter.js
│   │   │   │   │   ├── productPrice.presenter.js
│   │   │   │   │   └── stockMovement.presenter.js
│   │   │   │   ├── repositories/
│   │   │   │   │   ├── category.repository.js
│   │   │   │   │   ├── inventory.repository.js
│   │   │   │   │   ├── product.repository.js
│   │   │   │   │   ├── productImage.repository.js
│   │   │   │   │   ├── productPrice.repository.js
│   │   │   │   │   ├── productVariant.repository.js
│   │   │   │   │   └── stockMovement.repository.js
│   │   │   │   ├── routes/
│   │   │   │   │   ├── category.routes.js
│   │   │   │   │   ├── inventory.routes.js
│   │   │   │   │   ├── product.routes.js
│   │   │   │   │   ├── productImage.routes.js
│   │   │   │   │   ├── productPrice.routes.js
│   │   │   │   │   ├── README.md
│   │   │   │   │   └── stockMovement.routes.js
│   │   │   │   ├── services/
│   │   │   │   │   ├── category.service.js
│   │   │   │   │   ├── inventory.service.js
│   │   │   │   │   ├── product.service.js
│   │   │   │   │   ├── productImage.service.js
│   │   │   │   │   ├── productPrice.service.js
│   │   │   │   │   └── stockMovement.service.js
│   │   │   │   ├── validators/
│   │   │   │   │   ├── category.validator.js
│   │   │   │   │   ├── inventory.validator.js
│   │   │   │   │   ├── product.validator.js
│   │   │   │   │   ├── productImage.validator.js
│   │   │   │   │   ├── productPrice.validator.js
│   │   │   │   │   └── stockMovement.validator.js
│   │   │   │   └── index.js
│   │   │   ├── offering/
│   │   │   │   ├── builders/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── offering.builder.js
│   │   │   │   │   └── offering.factory.js
│   │   │   │   ├── constants/
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── offeringStatus.constants.js
│   │   │   │   │   └── offeringVisibility.constants.js
│   │   │   │   ├── controllers/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── offering.controller.js
│   │   │   │   ├── errors/
│   │   │   │   │   └── index.js
│   │   │   │   ├── lifecycles/
│   │   │   │   │   ├── shared/
│   │   │   │   │   │   └── offering.lifecycle.js
│   │   │   │   │   ├── booking.lifecycle.js
│   │   │   │   │   ├── course.lifecycle.js
│   │   │   │   │   ├── digitalDownload.lifecycle.js
│   │   │   │   │   ├── event.lifecycle.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── lifecycle.factory.js
│   │   │   │   │   ├── membership.lifecycle.js
│   │   │   │   │   ├── package.lifecycle.js
│   │   │   │   │   ├── product.lifecycle.js
│   │   │   │   │   ├── rental.lifecycle.js
│   │   │   │   │   ├── service.lifecycle.js
│   │   │   │   │   └── subscription.lifecycle.js
│   │   │   │   ├── models/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── offering.model.js
│   │   │   │   ├── presenters/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── offering.presenter.js
│   │   │   │   ├── registries/
│   │   │   │   │   └── index.js
│   │   │   │   ├── repositories/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── offering.repository.js
│   │   │   │   ├── routes/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── offering.routes.js
│   │   │   │   ├── services/
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── offering.service.js
│   │   │   │   ├── validators/
│   │   │   │   │   ├── businessParamsSchema.js
│   │   │   │   │   ├── createOfferingSchema.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── listOfferingsQuerySchema.js
│   │   │   │   │   ├── offeringParamsSchema.js
│   │   │   │   │   └── updateOfferingSchema.js
│   │   │   │   └── index.js
│   │   │   └── ...
│   │   └── ...
│   └── ...
└── ...
```
