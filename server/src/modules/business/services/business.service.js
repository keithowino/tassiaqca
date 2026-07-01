import businessRepository from "../repositories/business.repository.js";
import businessMemberRepository from "../../identity/repositories/businessMember.repository.js";
import roleRepository from "../../identity/repositories/role.repository.js";

import AppError from "../../../shared/errors/AppError.js";
import ErrorCodes from "../../../shared/errors/ErrorCodes.js";
import { HTTP_STATUS } from "../../../shared/constants/index.js";

class BusinessService {
	async create(command, ownerUserId) {
		const ownerRole = await roleRepository.findOwnerRole();

		if (!ownerRole) {
			throw new AppError(
				"Owner role has not been seeded.",
				HTTP_STATUS.INTERNAL_SERVER_ERROR,
				ErrorCodes.INTERNAL_SERVER_ERROR,
			);
		}

		const business = await businessRepository.create({
			name: command.name,
			description: command.description,
			businessType: command.businessType,
			phone: command.phone,
			email: command.email,
			logo: command.logo,
			coverImage: command.coverImage,
		});

		await businessMemberRepository.create({
			business: business._id,
			user: ownerUserId,
			role: ownerRole._id,
		});

		return business;
	}

	async updateBusiness(businessId, command) {
		const business = await businessRepository.findById(businessId);

		if (!business) {
			throw new AppError(
				"Business not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		return businessRepository.update(business, command);
	}
}

export default new BusinessService();
