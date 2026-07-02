import AppError from "../../../shared/errors/AppError.js";
import ErrorCodes from "../../../shared/errors/ErrorCodes.js";
import { HTTP_STATUS } from "../../../shared/constants/index.js";

import userRepository from "../../identity/repositories/user.repository.js";
import roleRepository from "../../identity/repositories/role.repository.js";
import businessRepository from "../repositories/business.repository.js";
import businessMemberRepository from "../../identity/repositories/businessMember.repository.js";

class BusinessMemberService {
	async invite(businessId, command) {
		const business = await businessRepository.findById(businessId);

		if (!business) {
			throw new AppError(
				"Business not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		const user = await userRepository.findByEmail(command.email);

		if (!user) {
			throw new AppError(
				"User not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		const alreadyMember =
			await businessMemberRepository.findByUserAndBusiness(
				user._id,
				businessId,
			);

		if (alreadyMember) {
			throw new AppError(
				"User is already a member of this business.",
				HTTP_STATUS.CONFLICT,
				ErrorCodes.CONFLICT,
			);
		}

		const role = await roleRepository.findById(command.roleId);

		if (!role) {
			throw new AppError(
				"Role not found.",
				HTTP_STATUS.NOT_FOUND,
				ErrorCodes.NOT_FOUND,
			);
		}

		return businessMemberRepository.create({
			business: businessId,
			user: user._id,
			role: role._id,
		});
	}
}

export default new BusinessMemberService();
