import categoryRepository from "../repositories/category.repository.js";
import categoryPresenter from "../presenters/category.presenter.js";

import businessRepository from "../../business/repositories/business.repository.js";
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
 * #### Similar Architecture
 * - Private helper functions
 * - Business existence validation
 * - Category existence validation
 * - Parent category validation
 * - Circular hierarchy prevention
 * - Unique slug generation
 * - Audit logging using the new requestMetadata pattern
 * - Presenter mapping
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

async function ensureCategoryNameIsUnique(businessId, name, excludeId = null) {
	const existing = await categoryRepository.findByBusinessAndName(
		businessId,
		name,
		excludeId,
	);

	if (existing) {
		throw new AppError(
			"A category with this name already exists.",
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
		await categoryRepository.existsByBusinessAndSlug(
			businessId,
			slug,
			excludeId,
		)
	) {
		slug = `${baseSlug}-${counter++}`;
	}

	return slug;
}

async function ensureParentCategoryExists(businessId, parentCategoryId) {
	if (!parentCategoryId) {
		return null;
	}

	return ensureCategoryExists(businessId, parentCategoryId);
}

function ensureNotSelfParent(categoryId, parentCategoryId) {
	if (parentCategoryId && categoryId === parentCategoryId) {
		throw new AppError(
			"A category cannot be its own parent.",
			HTTP_STATUS.BAD_REQUEST,
			ErrorCodes.VALIDATION_ERROR,
		);
	}
}

async function ensureNoCircularHierarchy(
	businessId,
	categoryId,
	parentCategoryId,
) {
	let currentParentId = parentCategoryId;

	while (currentParentId) {
		if (currentParentId.toString() === categoryId.toString()) {
			throw new AppError(
				"Circular category hierarchy detected.",
				HTTP_STATUS.BAD_REQUEST,
				ErrorCodes.VALIDATION_ERROR,
			);
		}

		const parent = await categoryRepository.findByBusinessAndId(
			businessId,
			currentParentId,
		);

		currentParentId = parent?.parentCategory ?? null;
	}
}

function buildAuditMetadata(category) {
	return {
		name: category.name,
		slug: category.slug,
		parentCategoryId: category.parentCategory,
		status: category.status,
		sortOrder: category.sortOrder,
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

	await ensureCategoryNameIsUnique(businessId, name);

	await ensureParentCategoryExists(businessId, data.parentCategoryId);

	const slug = await generateUniqueSlug(businessId, name);

	const category = await categoryRepository.create({
		...data,

		business: businessId,

		name,

		slug,

		parentCategory: data.parentCategoryId,

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

async function update({
	businessId,
	categoryId,
	data,
	actor,
	requestMetadata,
}) {
	await ensureBusinessExists(businessId);

	const category = await ensureCategoryExists(businessId, categoryId);

	if (data.name) {
		const name = data.name.trim();

		if (name !== category.name) {
			await ensureCategoryNameIsUnique(businessId, name, category.id);

			category.name = name;

			category.slug = await generateUniqueSlug(
				businessId,
				name,
				category.id,
			);
		}
	}

	if ("description" in data) {
		category.description = data.description;
	}

	if ("sortOrder" in data) {
		category.sortOrder = data.sortOrder;
	}

	if ("status" in data) {
		category.status = data.status;
	}

	if ("parentCategoryId" in data) {
		ensureNotSelfParent(category.id, data.parentCategoryId);

		await ensureParentCategoryExists(businessId, data.parentCategoryId);

		await ensureNoCircularHierarchy(
			businessId,
			category.id,
			data.parentCategoryId,
		);

		category.parentCategory = data.parentCategoryId;
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

async function list({ businessId, query }) {
	await ensureBusinessExists(businessId);

	const page = query.page ?? 1;
	const limit = query.limit ?? 20;

	const skip = (page - 1) * limit;

	const { data, total } = await categoryRepository.findByBusiness(
		businessId,
		{
			...query,
			skip,
			limit,
		},
	);

	return {
		data: categoryPresenter.presentCollection(data),

		pagination: {
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit),
		},
	};
}

async function getById({ businessId, categoryId }) {
	await ensureBusinessExists(businessId);

	const category = await ensureCategoryExists(businessId, categoryId);

	return categoryPresenter.present(category);
}

async function archive({ businessId, categoryId, actor, requestMetadata }) {
	await ensureBusinessExists(businessId);

	const category = await ensureCategoryExists(businessId, categoryId);

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

export default {
	create,
	update,
	list,
	getById,
	archive,
	restore,
};
