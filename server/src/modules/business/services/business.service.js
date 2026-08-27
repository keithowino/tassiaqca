import businessRepository from "../repositories/business.repository.js";
import businessMemberRepository from "../../identity/repositories/businessMember.repository.js";
import roleRepository from "../../identity/repositories/role.repository.js";

import { auditLogService } from "../../audit/index.js";

import { UnknownBusinessTypeError } from "../../businessConfiguration/errors/index.js";

import { businessProvisioningService } from "../../businessConfiguration/services/index.js";
import {
	businessTypeRegistry,
	slugify,
	AUDIT_ACTIONS,
	AUDIT_ENTITY_TYPES,
	HTTP_STATUS,
	AppError,
	ErrorCodes,
	withTransaction,
} from "../../../shared/index.js";
import { businessConfigurationService } from "../../businessConfiguration/index.js";

class BusinessService {
	/*
	|--------------------------------------------------------------------------
	| Public Helpers
	|--------------------------------------------------------------------------
	*/
	async ensureExists(businessId) {
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

	/*
	|--------------------------------------------------------------------------
	| Private Helpers
	|--------------------------------------------------------------------------
	*/

	async resolveOwnerRole() {
		const ownerRole = await roleRepository.findOwnerRole();

		if (!ownerRole) {
			throw new AppError(
				"Owner role has not been seeded.",
				HTTP_STATUS.INTERNAL_SERVER_ERROR,
				ErrorCodes.INTERNAL_SERVER_ERROR,
			);
		}

		return ownerRole;
	}

	resolveBusinessType(id) {
		const businessType = businessTypeRegistry.get(id);

		if (!businessType) {
			throw new UnknownBusinessTypeError(id);
		}

		return businessType;
	}

	async ensureBusinessNameIsUnique(name) {
		const exists = await businessRepository.existsByName(name);

		if (exists) {
			throw new AppError(
				`Business "${name}" already exists.`,
				HTTP_STATUS.CONFLICT,
				ErrorCodes.CONFLICT,
			);
		}
	}

	async ensureBusinessSlugIsUnique(slug) {
		const exists = await businessRepository.existsBySlug(slug);

		if (exists) {
			throw new AppError(
				`Business slug "${slug}" already exists.`,
				HTTP_STATUS.CONFLICT,
				ErrorCodes.CONFLICT,
			);
		}
	}

	/**
	 * Tomorrow this could become
	 * - collapse multiple spaces
	 * - remove invisible characters
	 * - Unicode normalization
	 */
	normalizeBusinessName(name) {
		return name.trim();
	}

	generateBusinessSlug(name) {
		return slugify(name);
	}

	async ensureMembership(businessId, actorId) {
		const membership = await businessMemberRepository.findByUserAndBusiness(
			actorId,
			businessId,
		);

		if (!membership) {
			throw new AppError(
				"You are not a member of this business.",
				HTTP_STATUS.FORBIDDEN,
				ErrorCodes.FORBIDDEN,
			);
		}

		return membership;
	}

	async getBusiness(businessId, actorId) {
		const business = await businessRepository.findById(businessId);

		if (!business) {
			throw new AppError(
				"Business not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		await this.ensureMembership(businessId, actorId);

		return business;
	}

	/*
	|--------------------------------------------------------------------------
	| Public Service
	|--------------------------------------------------------------------------
	*/

	async create(command, { actorId, requestMetadata }) {
		const ownerRole = await this.resolveOwnerRole();

		const businessType = this.resolveBusinessType(command.businessType);

		const name = this.normalizeBusinessName(command.name);

		const slug = this.generateBusinessSlug(name);

		await this.ensureBusinessNameIsUnique(name);

		await this.ensureBusinessSlugIsUnique(slug);

		return withTransaction(async (session) => {
			const business = await businessRepository.create(
				{
					name: command.name,
					slug,
					description: command.description,
					businessType: businessType.id,
					phone: command.phone,
					email: command.email,
					logo: command.logo,
					coverImage: command.coverImage,
				},
				{ session },
			);

			await businessProvisioningService.provisionBusiness(
				{
					business,
					actorId,
				},
				{ session },
			);

			await businessMemberRepository.create(
				{
					business: business._id,
					user: actorId,
					role: ownerRole._id,
				},
				session,
			);

			await auditLogService.log(
				{
					business: business._id,
					entityType: AUDIT_ENTITY_TYPES.BUSINESS,
					entityId: business._id,
					action: AUDIT_ACTIONS.BUSINESS_CREATED,
					actor: actorId,

					requestMetadata,

					metadata: {
						name: business.name,
						slug: business.slug,
					},
				},
				{ session },
			);

			return business;
		});
	}

	async updateBusiness(businessId, command, { actorId, requestMetadata }) {
		// const business = await businessRepository.findById(businessId);

		// if (!business) {
		// 	throw new AppError(
		// 		"Business not found.",
		// 		HTTP_STATUS.NOT_FOUND,
		// 		ErrorCodes.NOT_FOUND,
		// 	);
		// }

		// const updatedBusiness = await businessRepository.update(
		// 	business,
		// 	command,
		// );

		const business = await this.getBusiness(businessId, actorId);

		const updatedBusiness = await businessRepository.update(
			business,
			command,
		);

		await auditLogService.log({
			business: updatedBusiness._id,
			entityType: AUDIT_ENTITY_TYPES.BUSINESS,
			entityId: updatedBusiness._id,
			action: AUDIT_ACTIONS.BUSINESS_UPDATED,
			actor: actorId,

			requestMetadata,

			metadata: {
				name: updatedBusiness.name,
			},
		});

		return updatedBusiness;
	}

	async listBusinesses(actorId) {
		const memberships = await businessMemberRepository.findByUser(actorId);

		const businessIds = memberships.map(
			(membership) => membership.business,
		);

		if (businessIds.length === 0) {
			return [];
		}

		return businessRepository.findByIds(businessIds);
	}

	async getConfiguration(businessId, actorId) {
		await this.getBusiness(businessId, actorId);

		return businessConfigurationService.getConfiguration(businessId);
	}
}

export default new BusinessService();
