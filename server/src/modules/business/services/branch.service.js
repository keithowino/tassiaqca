import {
	AUDIT_ACTIONS,
	AUDIT_ENTITY_TYPES,
	HTTP_STATUS,
	AppError,
	ErrorCodes,
	slugify,
} from "../../../shared/index.js";

import { branchRepository, businessRepository } from "../repositories/index.js";

import { auditLogService } from "../../audit/index.js";
import { branchPresenter } from "../presenters/index.js";

class BranchService {
	async create({ businessId, command, actorId, requestMetadata }) {
		const business = await businessRepository.findById(businessId);

		if (!business) {
			throw new AppError(
				"Business not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		if (command.isHeadOffice) {
			const existingHeadOffice =
				await branchRepository.findHeadOffice(businessId);

			if (existingHeadOffice) {
				throw new AppError(
					"This business already has a Head Office.",
					HTTP_STATUS.CONFLICT,
					ErrorCodes.CONFLICT,
				);
			}
		}

		const slug = slugify(command.name);

		const existingBranch = await branchRepository.findByBusinessAndSlug(
			businessId,
			slug,
		);

		if (existingBranch) {
			throw new AppError(
				"A branch with this name already exists.",
				HTTP_STATUS.CONFLICT,
				ErrorCodes.CONFLICT,
			);
		}

		/**
		 * Note about isHeadOffice
		 * For this first implementation, we're allowing the client to set: `isHeadOffice: true`.
		 * However, we haven't yet enforced the business rule that only one head office may exist per business. It is recommend to implement it immediately after we have the endpoint working.
		 */
		const branch = await branchRepository.create({
			business: businessId,
			name: command.name,
			slug,
			description: command.description ?? "",
			phone: command.phone ?? null,
			email: command.email ?? null,
			address: command.address,
			city: command.city ?? "",
			county: command.county ?? "",
			latitude: command.latitude ?? null,
			longitude: command.longitude ?? null,
			isHeadOffice: command.isHeadOffice ?? false,
		});

		await auditLogService.log({
			business: businessId,
			entityType: AUDIT_ENTITY_TYPES.BRANCH,
			entityId: branch.id,
			action: AUDIT_ACTIONS.BRANCH_CREATED,
			actor: actorId,

			requestMetadata,

			metadata: {
				name: branch.name,
				slug: branch.slug,
				address: branch.address,
				isHeadOffice: branch.isHeadOffice,
			},
		});

		return branchPresenter.present(branch);
	}

	async list({ businessId }) {
		const business = await businessRepository.findById(businessId);

		if (!business) {
			throw new AppError(
				"Business not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		const branches =
			await branchRepository.findActiveByBusiness(businessId);

		return branchPresenter.presentCollection(branches);
	}

	/**
	 * Why this implementation?
	 * This keeps every business rule inside BranchService:
	 * Branch exists
	 * Slug uniqueness
	 * Automatically transfer Head Office status
	 * Prevent zero Head Offices
	 * Partial updates only (PATCH semantics)
	 * Repository remains persistence-only, with no business logic leaking into it
	 */
	async update({ businessId, branchId, command, actorId, requestMetadata }) {
		const branch = await branchRepository.findByBusinessAndId(
			businessId,
			branchId,
		);

		if (!branch) {
			throw new AppError(
				"Branch not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		/*
		|--------------------------------------------------------------------------
		| Name / Slug
		|--------------------------------------------------------------------------
		*/

		if (command.name && command.name.trim() !== branch.name) {
			const slug = slugify(command.name);

			const existingBranch = await branchRepository.findByBusinessAndSlug(
				businessId,
				slug,
			);

			if (
				existingBranch &&
				String(existingBranch.id) !== String(branch.id)
			) {
				throw new AppError(
					"A branch with this name already exists.",
					HTTP_STATUS.CONFLICT,
					ErrorCodes.CONFLICT,
				);
			}

			branch.name = command.name;
			branch.slug = slug;
		}

		/*
		|--------------------------------------------------------------------------
		| Head Office rules
		|--------------------------------------------------------------------------
		*/

		if (command.isHeadOffice === true && !branch.isHeadOffice) {
			const currentHeadOffice =
				await branchRepository.findHeadOffice(businessId);

			if (
				currentHeadOffice &&
				String(currentHeadOffice.id) !== String(branch.id)
			) {
				currentHeadOffice.isHeadOffice = false;

				await branchRepository.save(currentHeadOffice);
			}

			branch.isHeadOffice = true;
		}

		if (command.isHeadOffice === false && branch.isHeadOffice) {
			throw new AppError(
				"A business must always have one Head Office.",
				HTTP_STATUS.CONFLICT,
				ErrorCodes.CONFLICT,
			);
		}

		/*
		|--------------------------------------------------------------------------
		| Simple fields
		|--------------------------------------------------------------------------
		*/

		if (command.description !== undefined)
			branch.description = command.description;

		if (command.phone !== undefined) branch.phone = command.phone;

		if (command.email !== undefined) branch.email = command.email;

		if (command.address !== undefined) branch.address = command.address;

		if (command.city !== undefined) branch.city = command.city;

		if (command.county !== undefined) branch.county = command.county;

		if (command.latitude !== undefined) branch.latitude = command.latitude;

		if (command.longitude !== undefined)
			branch.longitude = command.longitude;

		if (command.active !== undefined) branch.active = command.active;

		const updatedBranch = await branchRepository.save(branch);

		await auditLogService.log({
			business: businessId,
			entityType: AUDIT_ENTITY_TYPES.BRANCH,
			entityId: updatedBranch.id,
			action: AUDIT_ACTIONS.BRANCH_UPDATED,
			actor: actorId,

			requestMetadata,

			metadata: {
				name: updatedBranch.name,
			},
		});

		return branchPresenter.present(updatedBranch);
	}

	async deactivate({ businessId, branchId, actorId, requestMetadata }) {
		const branch = await branchRepository.findByBusinessAndId(
			businessId,
			branchId,
		);

		if (!branch) {
			throw new AppError(
				"Branch not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		if (!branch.active) {
			throw new AppError(
				"Branch is already inactive.",
				HTTP_STATUS.CONFLICT,
				ErrorCodes.CONFLICT,
			);
		}

		if (branch.isHeadOffice) {
			throw new AppError(
				"The Head Office cannot be deactivated.",
				HTTP_STATUS.CONFLICT,
				ErrorCodes.CONFLICT,
			);
		}

		branch.active = false;

		const deactivatedBranch = await branchRepository.save(branch);

		await auditLogService.log({
			business: businessId,
			entityType: AUDIT_ENTITY_TYPES.BRANCH,
			entityId: deactivatedBranch.id,
			action: AUDIT_ACTIONS.BRANCH_DEACTIVATED,
			actor: actorId,

			requestMetadata,

			metadata: {
				name: deactivatedBranch.name,
			},
		});

		return branchPresenter.present(deactivatedBranch);
	}

	async reactivate({ businessId, branchId, actorId, requestMetadata }) {
		const branch = await branchRepository.findByBusinessAndId(
			businessId,
			branchId,
		);

		if (!branch) {
			throw new AppError(
				"Branch not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		if (branch.active) {
			throw new AppError(
				"Branch is already active.",
				HTTP_STATUS.CONFLICT,
				ErrorCodes.CONFLICT,
			);
		}

		branch.active = true;

		const reactivatedBranch = await branchRepository.save(branch);

		await auditLogService.log({
			business: businessId,
			entityType: AUDIT_ENTITY_TYPES.BRANCH,
			entityId: reactivatedBranch.id,
			action: AUDIT_ACTIONS.BRANCH_REACTIVATED,
			actor: actorId,

			requestMetadata,

			metadata: {
				name: reactivatedBranch.name,
			},
		});

		return branchPresenter.present(reactivatedBranch);
	}
}

export default new BranchService();
