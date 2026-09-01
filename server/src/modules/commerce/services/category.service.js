import { categoryRepository } from "../repositories/index.js";

import { categoryPresenter } from "../presenters/index.js";

import { auditLogService } from "../../audit/index.js";

import {
	slugify,
	CATEGORY_STATUS,
	AUDIT_ACTIONS,
	AUDIT_ENTITY_TYPES,
	HTTP_STATUS,
	AppError,
	ErrorCodes,
	ensureBusinessExists,
} from "../../../shared/index.js";

class CategoryService {
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

	async ensureCategoryExists(businessId, categoryId) {
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

	async ensureParentIsValid(businessId, parentId, categoryId = null) {
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

	async ensureNameIsUnique(businessId, name, excludeId = null) {
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

	async ensureNoCircularHierarchy(businessId, categoryId, parentId) {
		let currentParentId = parentId;

		while (currentParentId) {
			/**
			 * The proposed parent is the category being updated.
			 * Therefore assigning it would create a cycle.
			 */
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

			/*
			 * `findByBusinessAndId()` populates `parent`, so the value may be:
			 *
			 * - an ObjectId
			 * - a populated Category document
			 * - null
			 *
			 * Always continue traversal using the actual parent ID.
			 */
			currentParentId = parent.parent?._id ?? parent.parent ?? null;
		}
	}

	buildAuditMetadata(category) {
		return {
			name: category.name,
			slug: category.slug,
			parentId: category.parent?._id ?? category.parent ?? null,
			status: category.status,
			position: category.position,
		};
	}

	/*
	|--------------------------------------------------------------------------
	| Public Service
	|--------------------------------------------------------------------------
	*/

	async create({ businessId, data, actor, requestMetadata }) {
		await ensureBusinessExists(businessId);

		const name = data.name.trim();

		const slug = await this.ensureNameIsUnique(businessId, name);

		await this.ensureParentIsValid(businessId, data.parentId ?? null);

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

			metadata: this.buildAuditMetadata(category),
		});

		return categoryPresenter.present(category);
	}

	async list({ businessId, query }) {
		await ensureBusinessExists(businessId);

		const categories = await categoryRepository.findByBusiness(businessId, {
			status: query.status,
			parent: query.parentId !== undefined ? query.parentId : undefined,
		});

		return categoryPresenter.presentCollection(categories);
	}

	async get({ businessId, categoryId }) {
		await ensureBusinessExists(businessId);

		const category = await ensureCategoryExists(businessId, categoryId);

		return categoryPresenter.present(category);
	}

	async update({ businessId, categoryId, data, actor, requestMetadata }) {
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

		if (data.parentId !== undefined) {
			await this.ensureParentIsValid(
				businessId,
				data.parentId,
				category.id,
			);

			await ensureNoCircularHierarchy(
				businessId,
				category.id,
				data.parentId,
			);

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

			metadata: this.buildAuditMetadata(category),
		});

		return categoryPresenter.present(category);
	}

	async archive({ businessId, categoryId, actor, requestMetadata }) {
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

			metadata: this.buildAuditMetadata(category),
		});

		return categoryPresenter.present(category);
	}

	async restore({ businessId, categoryId, actor, requestMetadata }) {
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
			await this.ensureParentIsValid(
				businessId,
				category.parent,
				category.id,
			);
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

			metadata: this.buildAuditMetadata(category),
		});

		return categoryPresenter.present(category);
	}

	/**
	 * Service contract used by the Offering Categories component.
	 *
	 * This allows Offering to verify category assignments without
	 * reaching directly into Category persistence.
	 */
	async ensureAssignableCategories({ businessId, categoryIds = [] }) {
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

	/**
	 * Marketplace contract
	 */
	async listForMarketplace({
		search,
		businessId,
		parentId,
		skip = 0,
		limit = 20,
	} = {}) {
		const result = await categoryRepository.findForMarketplace({
			search,
			businessId,
			parentId,
			skip,
			limit,
		});

		return {
			// data: categoryPresenter.presentMarketplaceCollection(result.data),
			data: categoryPresenter.presentCollection(result.data),
			total: result.total,
		};
	}
}

export default new CategoryService();
