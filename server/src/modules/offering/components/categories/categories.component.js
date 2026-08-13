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
