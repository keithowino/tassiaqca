import businessMemberService from "../services/businessMember.service.js";

import validateRequest from "../../../shared/validation/validateRequest.js";
import inviteMemberRequestSchema from "../validators/inviteMember.validator.js";

import { success } from "../../../shared/utils/apiResponse.js";
import { HTTP_STATUS } from "../../../shared/constants/index.js";

class BusinessMemberController {
	async invite(req, res, next) {
		try {
			const { body } = validateRequest(
				{
					body: inviteMemberRequestSchema,
				},
				req,
			);

			const member = await businessMemberService.invite(
				req.params.businessId,
				body,
			);

			return success(
				res,
				member,
				"Member invited successfully.",
				HTTP_STATUS.CREATED,
			);
		} catch (error) {
			next(error);
		}
	}

	async list(req, res, next) {
		try {
			const members = await businessMemberService.list(
				req.params.businessId,
			);

			return success(res, members, "Members retrieved successfully.");
		} catch (error) {
			next(error);
		}
	}
}

export default new BusinessMemberController();
