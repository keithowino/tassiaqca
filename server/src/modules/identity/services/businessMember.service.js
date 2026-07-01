import businessMemberRepository from "../repositories/businessMember.repository.js";
import AppError from "../../../shared/errors/AppError.js";
import ErrorCodes from "../../../shared/errors/ErrorCodes.js";
import { HTTP_STATUS } from "../../../shared/constants/index.js";

/**
|--------------------------------------------------
| Reusable domain service
|--------------------------------------------------
*/
class BusinessMemberService {
	async ensureMember(userId, businessId) {
		const member = await businessMemberRepository.findByUserAndBusiness(
			userId,
			businessId,
		);

		if (!member) {
			throw new AppError(
				"You are not a member of this business.",
				HTTP_STATUS.FORBIDDEN,
				ErrorCodes.FORBIDDEN,
			);
		}

		if (!member.active) {
			throw new AppError(
				"Your membership is inactive.",
				HTTP_STATUS.FORBIDDEN,
				ErrorCodes.FORBIDDEN,
			);
		}

		return member;
	}

	async listMembers(businessId) {
		return businessMemberRepository.findByBusiness(businessId);
	}
}

export default new BusinessMemberService();
