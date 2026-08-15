We may proceed to converting the Media component to follow the following structure using the Pricing and or Categories offering components as a point of reference:

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

Here is the current implementation of the media offering component and more for reference. Determining its persistence boundary and service contract before creating any REST operations.

---

- Add:
    - Component refactor structure
    - current components contents
    - `offering.routes.js`

---

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

import {
	businessOfferingParamsSchema,
	setCategoriesRequestSchema,
} from "../validators/index.js";

const getCategories = asyncHandler(async (req, res) => {
	const { params } = validateRequest(
		{
			params: businessOfferingParamsSchema,
		},
		req,
	);

	const categories = await categoriesService.getByOffering(params.offeringId);

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

import { offeringRepository } from "../../../repositories/index.js";

import businessService from "../../../../business/services/business.service.js";

import { HTTP_STATUS } from "../../../../../shared/constants/index.js";
import { AppError, ErrorCodes } from "../../../../../shared/errors/index.js";

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
	 * Ensures that the Offering exists and belongs to the supplied business.
	 */
	async ensureOfferingExists(businessId, offeringId) {
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
		await businessService.ensureExists(businessId);

		await this.ensureOfferingExists(businessId, offeringId);

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

	async getByOffering(offeringId) {
		const assignments =
			await categoriesRepository.findByOffering(offeringId);

		return categoriesPresenter.presentCollection(assignments);
	}
}

export const categoriesService = new CategoriesService();

export default categoriesService;
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
