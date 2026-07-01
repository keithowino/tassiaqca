import businessMemberRepository from "../repositories/businessMember.repository.js";
import AppError from "../../../shared/errors/AppError.js";
import ErrorCodes from "../../../shared/errors/ErrorCodes.js";
import { HTTP_STATUS } from "../../../shared/constants/index.js";

export default function requirePermission(permissionKey) {
	return async (req, res, next) => {
		try {
			const userId = req.user.id;

			const { businessId } = req.params;

			const membership = await businessMemberRepository.findActiveMember(
				userId,
				businessId,
			);

			if (!membership) {
				throw new AppError(
					"You are not a member of this business.",
					HTTP_STATUS.FORBIDDEN,
					ErrorCodes.FORBIDDEN,
				);
			}

			const hasPermission = membership.role.permissions.some(
				(permission) => permission.key === permissionKey,
			);

			if (!hasPermission) {
				throw new AppError(
					"You do not have permission to perform this action.",
					HTTP_STATUS.FORBIDDEN,
					ErrorCodes.FORBIDDEN,
				);
			}

			req.membership = membership;

			next();
		} catch (error) {
			next(error);
		}
	};
}
