// import componentContract from "../component.contract.js";

// import categoriesSchema from "./validators/categories.schema.js";

// function normalizeCategories(categories = []) {
// 	return [...new Set(categories.map((id) => String(id)))];
// }

// export const categoriesComponent = {
// 	...componentContract,

// 	validateCreate(context) {
// 		if (context.data.categoryIds === undefined) {
// 			return;
// 		}

// 		categoriesSchema.parse(context.data.categoryIds);
// 	},

// 	validateUpdate(context) {
// 		if (context.data.categoryIds === undefined) {
// 			return;
// 		}

// 		categoriesSchema.parse(context.data.categoryIds);
// 	},

// 	beforeCreate(context) {
// 		if (context.data.categoryIds === undefined) {
// 			return;
// 		}

// 		context.data.categories = normalizeCategories(context.data.categoryIds);

// 		delete context.data.categoryIds;
// 	},

// 	beforeUpdate(context) {
// 		if (context.data.categoryIds === undefined) {
// 			return;
// 		}

// 		context.data.categories = normalizeCategories(context.data.categoryIds);

// 		delete context.data.categoryIds;
// 	},
// };

// export default categoriesComponent;

// // ...

import componentContract from "../component.contract.js";

import categoriesSchema from "./validators/categories.schema.js";

import categoryService from "../../../commerce/services/category.service.js";

export const categoriesComponent = {
	...componentContract,

	async validateCreate(context) {
		if (context.data.categoryIds === undefined) {
			return;
		}

		const categoryIds = categoriesSchema.parse(context.data.categoryIds);

		await categoryService.ensureAssignableCategories(
			context.businessId,
			categoryIds,
		);
	},

	async validateUpdate(context) {
		if (context.data.categoryIds === undefined) {
			return;
		}

		const categoryIds = categoriesSchema.parse(context.data.categoryIds);

		await categoryService.ensureAssignableCategories(
			context.businessId,
			categoryIds,
		);
	},

	beforeCreate(context) {
		if (context.data.categoryIds === undefined) {
			return;
		}

		context.data.categories = [
			...new Set(context.data.categoryIds.map(String)),
		];

		delete context.data.categoryIds;
	},

	beforeUpdate(context) {
		if (context.data.categoryIds === undefined) {
			return;
		}

		context.data.categories = [
			...new Set(context.data.categoryIds.map(String)),
		];

		delete context.data.categoryIds;
	},
};

export default categoriesComponent;
