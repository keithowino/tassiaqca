To confirm the prevention of circular hierarchy i created a new root category:

```js
// Response

{"success":true,"message":"Category created successfully.","data":{"id":"6a7ac466858923859f0ff41b","businessId":"6a72d57f8b94e4f1232d4112","name":"Laptops","slug":"laptops","description":"Laptop computers and related devices","parentId":null,"status":"ACTIVE","position":0,"metadata":{},"createdAt":"2026-08-11T06:42:46.908Z","updatedAt":"2026-08-11T06:42:46.908Z"}}
```

Then i created it's child category:

```js
// Response

{"success":true,"message":"Category created successfully.","data":{"id":"6a7ac505858923859f0ff41d","businessId":"6a72d57f8b94e4f1232d4112","name":"Business Laptops","slug":"business-laptops","description":"Laptops designed for business and professional use","parentId":"6a7ac466858923859f0ff41b","status":"ACTIVE","position":0,"metadata":{},"createdAt":"2026-08-11T06:45:25.263Z","updatedAt":"2026-08-11T06:45:25.263Z"}}
```

Then attempted to make the parent the child of it's child:

```js
// Response

{"success":true,"message":"Category updated successfully.","data":{"id":"6a7ac466858923859f0ff41b","businessId":"6a72d57f8b94e4f1232d4112","name":"Laptops","slug":"laptops","description":"Laptop computers and related devices","parentId":"6a7ac505858923859f0ff41d","status":"ACTIVE","position":0,"metadata":{},"createdAt":"2026-08-11T06:42:46.908Z","updatedAt":"2026-08-11T06:48:00.027Z"}}
```

This is not supposed to be successful.

```js
`~\server\src\modules\commerce\services\category.service.js`;

// import { HTTP_STATUS } from "../../../shared/constants/index.js";
// import CategoryStatus from "../../../shared/constants/categoryStatus.js";

import businessRepository from "../../business/repositories/business.repository.js";

import categoryRepository from "../repositories/category.repository.js";

import categoryPresenter from "../presenters/category.presenter.js";

import { auditLogService } from "../../audit/index.js";

import slugify from "../../../shared/utils/slugify.js";

import {
	CATEGORY_STATUS,
	AUDIT_ACTIONS,
	AUDIT_ENTITY_TYPES,
	HTTP_STATUS,
} from "../../../shared/constants/index.js";

import { AppError, ErrorCodes } from "../../../shared/errors/index.js";

/**
 * #### One important refinement
 *
 * The hierarchy rule currently prevents a category from being its own parent, but cycle detection will eventually need to be added.
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

async function ensureCategoryExists(businessId, categoryId) {
	const category = await categoryRepository.findByBusinessAndId(
		businessId,
		categoryId,
	);

	if (!category) {
		throw new AppError(
			"Category not found.",
			HTTP_STATUS.NOT_FOUND,
			ErrorCodes.NOT_FOUND,
		);
	}

	return category;
}

async function ensureParentIsValid(businessId, parentId, categoryId = null) {
	if (!parentId) {
		return null;
	}

	if (categoryId && String(parentId) === String(categoryId)) {
		throw new AppError(
			"A category cannot be its own parent.",
			HTTP_STATUS.BAD_REQUEST,
			ErrorCodes.BAD_REQUEST,
		);
	}

	const parent = await categoryRepository.findByBusinessAndId(
		businessId,
		parentId,
	);

	if (!parent) {
		throw new AppError(
			"Parent category not found.",
			HTTP_STATUS.NOT_FOUND,
			ErrorCodes.NOT_FOUND,
		);
	}

	if (parent.status !== CATEGORY_STATUS.ACTIVE) {
		throw new AppError(
			"An inactive category cannot be used as a parent.",
			HTTP_STATUS.CONFLICT,
			ErrorCodes.CONFLICT,
		);
	}

	return parent;
}

async function ensureNameIsUnique(businessId, name, excludeId = null) {
	const slug = slugify(name);

	const existing = await categoryRepository.findByBusinessAndSlug(
		businessId,
		slug,
		excludeId,
	);

	if (existing) {
		throw new AppError(
			"A category with this name already exists.",
			HTTP_STATUS.CONFLICT,
			ErrorCodes.CONFLICT,
		);
	}

	return slug;
}

async function ensureNoCircularHierarchy(businessId, categoryId, parentId) {
	let currentParentId = parentId;

	while (currentParentId) {
		if (String(currentParentId) === String(categoryId)) {
			throw new AppError(
				"Circular category hierarchy detected.",
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.BAD_REQUEST,
			);
		}

		const parent = await categoryRepository.findByBusinessAndId(
			businessId,
			currentParentId,
		);

		if (!parent) {
			break;
		}

		currentParentId = parent.parent ?? null;
	}
}

function buildAuditMetadata(category) {
	return {
		name: category.name,
		slug: category.slug,
		parent: category.parent,
		status: category.status,
		position: category.position,
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

	const slug = await ensureNameIsUnique(businessId, name);

	await ensureParentIsValid(businessId, data.parentId ?? null);

	// return categoryRepository.create({
	// 	business: businessId,

	// 	name,

	// 	slug,

	// 	description: data.description ?? "",

	// 	parent: data.parentId ?? null,

	// 	position: data.position ?? 0,

	// 	metadata: data.metadata ?? {},

	// 	createdBy: actor.id,

	// 	updatedBy: actor.id,
	// });

	const category = await categoryRepository.create({
		...data,

		business: businessId,

		name,

		slug,

		parent: data.parentId ?? null,

		createdBy: actor.id,

		updatedBy: actor.id,
	});

	await auditLogService.log({
		business: businessId,

		entityType: AUDIT_ENTITY_TYPES.CATEGORY,

		entityId: category.id,

		action: AUDIT_ACTIONS.CATEGORY_CREATED,

		actor,

		requestMetadata,

		metadata: buildAuditMetadata(category),
	});

	return categoryPresenter.present(category);
}

async function list({ businessId, query }) {
	await ensureBusinessExists(businessId);

	return categoryRepository.findByBusiness(businessId, {
		status: query.status,
		parent: query.parentId !== undefined ? query.parentId : undefined,
	});
}

async function get({ businessId, categoryId }) {
	await ensureBusinessExists(businessId);

	const category = await ensureCategoryExists(businessId, categoryId);

	return categoryPresenter.present(category);
}

async function update({
	businessId,
	categoryId,
	data,
	actor,
	requestMetadata,
}) {
	await ensureBusinessExists(businessId);

	const category = await ensureCategoryExists(businessId, categoryId);

	if (data.name !== undefined) {
		const name = data.name.trim();

		if (name !== category.name) {
			category.slug = await ensureNameIsUnique(
				businessId,
				name,
				category.id,
			);

			category.name = name;
		}
	}

	if (data.description !== undefined) {
		category.description = data.description;
	}

	if (data.position !== undefined) {
		category.position = data.position;
	}

	// if (data.parentId !== undefined) {
	// 	await ensureParentIsValid(businessId, data.parentId, category.id);

	// 	category.parent = data.parentId;
	// }

	if (data.parentId !== undefined) {
		await ensureParentIsValid(businessId, data.parentId, category.id);

		await ensureNoCircularHierarchy(businessId, category.id, data.parentId);

		category.parent = data.parentId;
	}

	if (data.metadata !== undefined) {
		category.metadata = data.metadata;
	}

	category.updatedBy = actor.id;

	await categoryRepository.save(category);

	await auditLogService.log({
		business: businessId,

		entityType: AUDIT_ENTITY_TYPES.CATEGORY,

		entityId: category.id,

		action: AUDIT_ACTIONS.CATEGORY_UPDATED,

		actor,

		requestMetadata,

		metadata: buildAuditMetadata(category),
	});

	return categoryPresenter.present(category);
}

async function archive({ businessId, categoryId, actor, requestMetadata }) {
	await ensureBusinessExists(businessId);

	const category = await ensureCategoryExists(businessId, categoryId);

	if (category.status === CATEGORY_STATUS.ARCHIVED) {
		throw new AppError(
			"Category is already archived.",
			HTTP_STATUS.BAD_REQUEST,
			ErrorCodes.BAD_REQUEST,
		);
	}

	category.status = CATEGORY_STATUS.ARCHIVED;
	category.updatedBy = actor.id;

	await categoryRepository.save(category);

	await auditLogService.log({
		business: businessId,

		entityType: AUDIT_ENTITY_TYPES.CATEGORY,

		entityId: category.id,

		action: AUDIT_ACTIONS.CATEGORY_ARCHIVED,

		actor,

		requestMetadata,

		metadata: buildAuditMetadata(category),
	});

	return categoryPresenter.present(category);
}

async function restore({ businessId, categoryId, actor, requestMetadata }) {
	await ensureBusinessExists(businessId);

	const category = await ensureCategoryExists(businessId, categoryId);

	if (category.status === CATEGORY_STATUS.ACTIVE) {
		throw new AppError(
			"Category is already active.",
			HTTP_STATUS.BAD_REQUEST,
			ErrorCodes.BAD_REQUEST,
		);
	}

	if (category.parent) {
		await ensureParentIsValid(businessId, category.parent, category.id);
	}

	category.status = CATEGORY_STATUS.ACTIVE;
	category.updatedBy = actor.id;

	await categoryRepository.save(category);

	await auditLogService.log({
		business: businessId,

		entityType: AUDIT_ENTITY_TYPES.CATEGORY,

		entityId: category.id,

		action: AUDIT_ACTIONS.CATEGORY_RESTORED,

		actor,

		requestMetadata,

		metadata: buildAuditMetadata(category),
	});

	return categoryPresenter.present(category);
}

/**
 * Service contract used by the Offering Categories component.
 *
 * This allows Offering to verify category assignments without
 * reaching directly into Category persistence.
 */
async function ensureAssignableCategories(businessId, categoryIds = []) {
	if (!categoryIds.length) {
		return [];
	}

	const categories = await categoryRepository.findByBusiness(businessId);

	const categoryMap = new Map(
		categories.map((category) => [String(category.id), category]),
	);

	const resolved = [];

	for (const categoryId of categoryIds) {
		const category = categoryMap.get(String(categoryId));

		if (!category) {
			throw new AppError(
				"One or more categories were not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		if (category.status !== CATEGORY_STATUS.ACTIVE) {
			throw new AppError(
				"Inactive categories cannot be assigned to offerings.",
				HTTP_STATUS.CONFLICT,
				ErrorCodes.CONFLICT,
			);
		}

		resolved.push(category);
	}

	return resolved;
}

export default {
	create,
	list,
	get,
	update,
	archive,
	restore,
	ensureAssignableCategories,
};
```
