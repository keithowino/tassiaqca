```bash
PHASE A — Shared Offering Components
────────────────────────────────────

1. Metadata (covered)
2. Tags (covered)
3. Categories (covered)
4. Media (covered)
5. SEO (covered)


PHASE B — Offering Structure
────────────────────────────────────

6. Attributes (covered)
7. Variants


PHASE C — Commerce Operations
────────────────────────────────────

8. Pricing (covered)
9. Inventory


PHASE D — Availability / Time
────────────────────────────────────

10. Duration
11. Capacity
12. Location
13. Calendar
14. Scheduling


PHASE E — Customer Interaction
────────────────────────────────────

15. Booking
16. Registration
17. Enrollment


PHASE F — Specialized Offering Models
────────────────────────────────────

18. Membership
19. Subscription
20. Download
```

The following information shows a portion of the:

---

- Add:
    - `offeringComponent.registry.js`
    - `offering.registry.js`
    - `offering.routes.js`

---

```js
`~\server\src\modules\offering\builders\offering.builder.js`;

import { HTTP_STATUS } from "../../../shared/constants/index.js";
import { AppError, ErrorCodes } from "../../../shared/errors/index.js";
import offeringRegistry from "../../../shared/platform/offerings/offering.registry.js";

/**
 * Builds only the core Offering document.
 *
 * Component-owned data must never be persisted through this builder.
 *
 * Core Offering ownership:
 * - business
 * - type
 * - slug
 * - name
 * - shortDescription
 * - description
 * - status
 * - visibility
 * - searchable
 * - featured
 * - metadata
 * - createdBy
 * - updatedBy
 */
export function buildOffering({ businessId, data, slug, actor }) {
	const definition = offeringRegistry.get(data.type);

	if (!definition) {
		throw new AppError(
			`Unknown offering type "${data.type}".`,
			HTTP_STATUS.NOT_FOUND,
			ErrorCodes.NOT_FOUND,
		);
	}

	const defaults = definition.defaults ?? {};

	return {
		business: businessId,

		type: definition.type,

		slug,

		name: data.name.trim(),

		shortDescription: data.shortDescription ?? "",

		description: data.description ?? "",

		status: data.status ?? defaults.status,

		visibility: data.visibility ?? defaults.visibility,

		searchable: data.searchable ?? defaults.searchable,

		featured: data.featured ?? defaults.featured,

		metadata: {
			...(defaults.metadata ?? {}),
			...(data.metadata ?? {}),
		},

		createdBy: actor.id,

		updatedBy: actor.id,
	};
}
```

```js
`~\server\src\modules\offering\components\categories\builders\categories.builder.js`;

class CategoriesBuilder {
	constructor() {
		this.categories = {};
	}

	setBusiness(businessId) {
		this.categories.business = businessId;
		return this;
	}

	setOffering(offeringId) {
		this.categories.offering = offeringId;
		return this;
	}

	setCategory(categoryId) {
		this.categories.category = categoryId;
		return this;
	}

	setCreatedBy(userId) {
		this.categories.createdBy = userId;
		return this;
	}

	setUpdatedBy(userId) {
		this.categories.updatedBy = userId;
		return this;
	}

	build() {
		return Object.freeze({
			...this.categories,
		});
	}
}

export default CategoriesBuilder;
```

```js
`~\server\src\modules\offering\components\categories\builders\categories.factory.js`;

import CategoriesBuilder from "./categories.builder.js";

function createCategoryAssignment({
	businessId,
	offeringId,
	categoryId,
	actor,
}) {
	return new CategoriesBuilder()
		.setBusiness(businessId)
		.setOffering(offeringId)
		.setCategory(categoryId)
		.setCreatedBy(actor.id)
		.setUpdatedBy(actor.id)
		.build();
}

export default {
	createCategoryAssignment,
};
```

```js
`~\server\src\modules\offering\components\categories\categories.component.js`;

import componentContract from "../component.contract.js";

import {
	createCategoriesSchema,
	updateCategoriesSchema,
} from "./validators/index.js";

import { categoriesService } from "./services/index.js";
import categoryService from "../../../commerce/services/category.service.js";

export const categoriesComponent = {
	...componentContract,

	async validateCreate(context) {
		if (context.data.categoryIds === undefined) {
			return;
		}

		const { categoryIds } = createCategoriesSchema.parse({
			categoryIds: context.data.categoryIds,
		});

		await categoryService.ensureAssignableCategories({
			businessId: context.businessId,
			categoryIds,
		});
	},

	async validateUpdate(context) {
		if (context.data.categoryIds === undefined) {
			return;
		}

		const { categoryIds } = updateCategoriesSchema.parse({
			categoryIds: context.data.categoryIds,
		});

		await categoryService.ensureAssignableCategories({
			businessId: context.businessId,
			categoryIds,
		});
	},

	async afterCreate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data.categoryIds === undefined) {
			return;
		}

		const categories = await categoriesService.setCategories({
			businessId,
			offeringId: offering.id,
			categoryIds: data.categoryIds,
			actor,
		});

		state.categories = categories;
	},

	async afterUpdate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data.categoryIds === undefined) {
			return;
		}

		const categories = await categoriesService.setCategories({
			businessId,
			offeringId: offering.id,
			categoryIds: data.categoryIds,
			actor,
		});

		state.categories = categories;
	},
};

export default categoriesComponent;
```

```js
`~\server\src\modules\offering\components\categories\controllers\categories.controller.js`;

import asyncHandler from "../../../../../shared/utils/asyncHandler.js";
import { success } from "../../../../../shared/utils/apiResponse.js";
import { validateRequest } from "../../../../../shared/validation/index.js";

import { categoriesService } from "../services/index.js";

import { setCategoriesRequestSchema } from "../validators/index.js";

import { businessOfferingParamsSchema } from "../../shared/index.js";

const getCategories = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessOfferingParamsSchema,
		},
		req,
	);

	const categories = await categoriesService.getByOffering(
		params.businessId,
		params.offeringId,
	);

	return success(
		res,
		categories,
		"Offering categories retrieved successfully.",
	);
});

const setCategories = asyncHandler(async (req, res) => {
	const { params, body } = validateRequest(
		{
			params: businessOfferingParamsSchema,
			body: setCategoriesRequestSchema,
		},
		req,
	);

	const categories = await categoriesService.setCategories({
		businessId: params.businessId,
		offeringId: params.offeringId,
		categoryIds: body.categoryIds,
		actor: req.user,
	});

	return success(
		res,
		categories,
		"Offering categories updated successfully.",
	);
});

export default {
	getCategories,
	setCategories,
};
```

```js
`~\server\src\modules\offering\components\categories\services\categories.service.js`;

import mongoose from "mongoose";

import { categoriesFactory } from "../builders/index.js";
import { categoriesPresenter } from "../presenters/index.js";
import { categoriesRepository } from "../repositories/index.js";

import categoryService from "../../../../commerce/services/category.service.js";

import { HTTP_STATUS } from "../../../../../shared/constants/index.js";
import { AppError, ErrorCodes } from "../../../../../shared/errors/index.js";

import {
	ensureBusinessExists,
	ensureOfferingExists,
} from "../../shared/index.js";

/**
 * #### POST and DELETE?
 *
 * As per the AI's recommendation, adding them later merely to make the REST API look CRUD-complete would introduce unnecessary semantics.
 */
class CategoriesService {
	/**
	 * Ensures that the supplied category IDs are valid MongoDB ObjectIds.
	 */
	validateCategoryIds(categoryIds) {
		for (const categoryId of categoryIds) {
			if (!mongoose.Types.ObjectId.isValid(categoryId)) {
				throw new AppError(
					`Invalid category ID: ${categoryId}.`,
					HTTP_STATUS.BAD_REQUEST,
					ErrorCodes.BAD_REQUEST,
				);
			}
		}
	}

	/**
	 * Replaces all category assignments for an Offering.
	 *
	 * Validation of the categories payload is performed by the Categories Component before this service is invoked.
	 *
	 * Persistence is transactional:
	 *
	 * 1. Ensure business exists.
	 * 2. Ensure Offering exists within this business.
	 * 3. Validate category IDs
	 * 4. Ensure categories belong to the business.
	 * 5. Ensure categories are ACTIVE.
	 * 6. Start transaction.
	 * 7. Delete existing assignments.
	 * 8. Create new assignments.
	 * 9. Commit.
	 * 10. Return resulting assignments.
	 */
	async setCategories({ businessId, offeringId, categoryIds = [], actor }) {
		await ensureBusinessExists(businessId);

		await ensureOfferingExists(businessId, offeringId);

		const uniqueCategoryIds = [...new Set(categoryIds.map(String))];

		this.validateCategoryIds(uniqueCategoryIds);

		await categoryService.ensureAssignableCategories({
			businessId,
			categoryIds: uniqueCategoryIds,
		});

		const session = await mongoose.startSession();

		try {
			session.startTransaction();

			await categoriesRepository.deleteByOffering(offeringId, session);

			const assignments = uniqueCategoryIds.map((categoryId) =>
				categoriesFactory.createCategoryAssignment({
					businessId,
					offeringId,
					categoryId,
					actor,
				}),
			);

			const created = await categoriesRepository.createMany(
				assignments,
				session,
			);

			await session.commitTransaction();

			return categoriesPresenter.presentCollection(created);
		} catch (error) {
			await session.abortTransaction();
			throw error;
		} finally {
			await session.endSession();
		}
	}

	async getByOffering(businessId, offeringId) {
		await ensureBusinessExists(businessId);

		await ensureOfferingExists(businessId, offeringId);

		const assignments =
			await categoriesRepository.findByOffering(offeringId);

		return categoriesPresenter.presentCollection(assignments);
	}
}

export const categoriesService = new CategoriesService();

export default categoriesService;
```

```js
`~\server\src\modules\offering\components\categories\presenters\categories.presenter.js`;

import { getId } from "../../../../../shared/utils/presenter.js";

class CategoriesPresenter {
	present(assignment) {
		if (!assignment) {
			return null;
		}

		return {
			id: assignment.id,

			business: getId(assignment.business),

			offering: getId(assignment.offering),

			category: assignment.category
				? {
						id: getId(assignment.category),
						name: assignment.category.name,
						slug: assignment.category.slug,
					}
				: assignment.category,

			createdBy: assignment.createdBy,

			updatedBy: assignment.updatedBy,

			createdAt: assignment.createdAt,

			updatedAt: assignment.updatedAt,
		};
	}

	presentCollection(assignments = []) {
		return assignments.map((item) => this.present(item));
	}
}

export const categoriesPresenter = new CategoriesPresenter();

export default categoriesPresenter;
```

```js
`~\server\src\modules\offering\components\categories\models\categories.model.js`;

import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema(
	{
		business: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Business",
			required: true,
			index: true,
		},

		offering: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Offering",
			required: true,
			index: true,
		},

		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: true,
			index: true,
		},

		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		updatedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

categoriesSchema.index(
	{
		offering: 1,
		category: 1,
	},
	{
		unique: true,
	},
);

categoriesSchema.index({
	business: 1,
	offering: 1,
});

export const OfferingCategory =
	mongoose.models.OfferingCategory ||
	mongoose.model("OfferingCategory", categoriesSchema);

export default OfferingCategory;
```

```js
`~\server\src\modules\offering\components\categories\repositories\categories.repository.js`;

import { OfferingCategory } from "../models/index.js";

class CategoriesRepository {
	async create(data, session = null) {
		const [assignment] = await OfferingCategory.create([data], {
			session,
		});

		return assignment;
	}

	async createMany(data, session = null) {
		if (!data.length) {
			return [];
		}

		return OfferingCategory.insertMany(data, {
			session,
		});
	}

	async findByOffering(offeringId) {
		return OfferingCategory.find({
			offering: offeringId,
		})
			.populate("category")
			.sort({
				createdAt: 1,
			});
	}

	async findByOfferingAndCategory(offeringId, categoryId) {
		return OfferingCategory.findOne({
			offering: offeringId,
			category: categoryId,
		});
	}

	async deleteByOffering(offeringId, session = null) {
		return OfferingCategory.deleteMany(
			{
				offering: offeringId,
			},
			{
				session,
			},
		);
	}

	async deleteByOfferingAndCategories(
		offeringId,
		categoryIds,
		session = null,
	) {
		return OfferingCategory.deleteMany(
			{
				offering: offeringId,
				category: {
					$in: categoryIds,
				},
			},
			{
				session,
			},
		);
	}
}

export default new CategoriesRepository();
```

```js
`~\server\src\modules\offering\components\categories\routes\categories.routes.js`;

import { Router } from "express";

import { requirePermission } from "../../../../identity/index.js";

import { Permissions } from "../../../../../shared/constants/index.js";

import { categoriesController } from "../controllers/index.js";

const router = Router({
	mergeParams: true,
});

router
	.route("/")
	.get(
		requirePermission(Permissions.OFFERING_VIEW),
		categoriesController.getCategories,
	)
	.put(
		requirePermission(Permissions.OFFERING_UPDATE),
		categoriesController.setCategories,
	);

export default router;
```

```js
`~\server\src\modules\offering\components\attributes\services\attributes.service.js`;

import mongoose from "mongoose";

import { attributesFactory } from "../builders/index.js";
import { attributesPresenter } from "../presenters/index.js";
import { attributesRepository } from "../repositories/index.js";

import { normalizeAttributes } from "../validators/index.js";

import {
	ensureBusinessExists,
	ensureOfferingExists,
} from "../../shared/index.js";

class AttributesService {
	async setAttributes({ businessId, offeringId, attributes = [], actor }) {
		await ensureBusinessExists(businessId);

		await ensureOfferingExists(businessId, offeringId);

		const normalizedAttributes = normalizeAttributes(attributes);

		const session = await mongoose.startSession();

		try {
			session.startTransaction();

			await attributesRepository.deleteByOffering(offeringId, session);

			const assignments = normalizedAttributes.map((attribute) =>
				attributesFactory.createAttribute({
					businessId,
					offeringId,
					attribute,
					actor,
				}),
			);

			const created = await attributesRepository.createMany(
				assignments,
				session,
			);

			await session.commitTransaction();

			return attributesPresenter.presentCollection(created);
		} catch (error) {
			await session.abortTransaction();
			throw error;
		} finally {
			await session.endSession();
		}
	}

	async getByOffering(businessId, offeringId) {
		await ensureBusinessExists(businessId);

		await ensureOfferingExists(businessId, offeringId);

		const attributes =
			await attributesRepository.findByOffering(offeringId);

		return attributesPresenter.presentCollection(attributes);
	}
}

export const attributesService = new AttributesService();

export default attributesService;
```

```js
`~\server\src\modules\offering\components\attributes\attributes.component.js`;

import componentContract from "../component.contract.js";

import attributesSchema from "./validators/attributes.schema.js";
import { normalizeAttributes } from "./validators/index.js";

import { attributesService } from "./services/index.js";

export const attributesComponent = {
	...componentContract,

	validateCreate(context) {
		if (context.data.attributes === undefined) {
			return;
		}

		attributesSchema.parse(context.data.attributes);
	},

	validateUpdate(context) {
		if (context.data.attributes === undefined) {
			return;
		}

		attributesSchema.parse(context.data.attributes);
	},

	beforeCreate(context) {
		if (context.data.attributes === undefined) {
			return;
		}

		context.data.attributes = normalizeAttributes(context.data.attributes);
	},

	beforeUpdate(context) {
		if (context.data.attributes === undefined) {
			return;
		}

		context.data.attributes = normalizeAttributes(context.data.attributes);
	},

	async afterCreate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data.attributes === undefined) {
			return;
		}

		const attributes = await attributesService.setAttributes({
			businessId,
			offeringId: offering.id,
			attributes: data.attributes,
			actor,
		});

		state.attributes = attributes;
	},

	async afterUpdate(context) {
		const { businessId, offering, data, actor, state } = context;

		if (data.attributes === undefined) {
			return;
		}

		const attributes = await attributesService.setAttributes({
			businessId,
			offeringId: offering.id,
			attributes: data.attributes,
			actor,
		});

		state.attributes = attributes;
	},
};

export default attributesComponent;
```

```js
`~\server\src\modules\offering\components\attributes\validators\attributes.normalizer.js`;

import { AppError, ErrorCodes } from "../../../../../shared/errors/index.js";
import { HTTP_STATUS } from "../../../../../shared/constants/index.js";

/**
 * Normalizes an individual attribute.
 *
 * Attribute names and values retain their display casing,
 * while surrounding whitespace is removed.
 *
 * Duplicate values are removed case-insensitively.
 */
export function normalizeAttribute(attribute) {
	const name = attribute.name.trim();

	const values = [];
	const seenValues = new Set();

	for (const value of attribute.values) {
		const normalizedValue = value.trim();
		const key = normalizedValue.toLowerCase();

		if (seenValues.has(key)) {
			continue;
		}

		seenValues.add(key);
		values.push(normalizedValue);
	}

	return {
		name,
		values,
	};
}

/**
 * Normalizes the complete attribute collection.
 *
 * Attribute names must be unique case-insensitively.
 *
 * Example:
 *
 * Color
 * color
 *
 * is rejected rather than silently discarded.
 */
export function normalizeAttributes(attributes = []) {
	const normalized = [];
	const seenNames = new Set();

	for (const attribute of attributes) {
		const normalizedAttribute = normalizeAttribute(attribute);
		const key = normalizedAttribute.name.toLowerCase();

		if (seenNames.has(key)) {
			throw new AppError(
				`Duplicate attribute name "${normalizedAttribute.name}".`,
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.BAD_REQUEST,
			);
		}

		seenNames.add(key);
		normalized.push(normalizedAttribute);
	}

	return normalized;
}

export default {
	normalizeAttribute,
	normalizeAttributes,
};
```

```js
`~\server\src\modules\offering\components\attributes\validators\attributes.schema.js`;

import { z } from "zod";

const attributeSchema = z.object({
	name: z.string().trim().min(1).max(100),

	values: z.array(z.string().trim().min(1).max(100)).min(1).max(100),
});

export const attributesSchema = z.array(attributeSchema).max(50);

export default attributesSchema;
```

We may proceed to creating the Variants offering component, it's implementation should follow the following structure and if you see fit, use the Pricing, Media and or Categories offering components as a point of reference:

```bash
├── builders/
├── controllers/
├── models/
├── presenters/
├── repositories/
├── routes/
├── services/
├── validators/
└── media.component.js
```

Before implementation analyze:

- What responsibility does it own?
- What Offering Types use it?
- What other components does it depend on?
- What components may depend on it?
- What lifecycle hooks does it participate in?
- What validation does it perform?
- What invariants must remain true?
- What business concept does it represent?
- What API does it require?
- What permissions are required?
- What audit events are required?
- What frontend experience will eventually consume it?

Only after this analysis should implementation begin.
