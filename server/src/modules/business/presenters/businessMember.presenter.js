import { userPresenter } from "../../identity/presenters/index.js";
import { rolePresenter } from "./index.js";

class BusinessMemberPresenter {
	present(member) {
		if (!member) {
			return null;
		}

		return {
			id: member.id,
			active: member.active,
			joinedAt: member.joinedAt,
			createdAt: member.createdAt,
			updatedAt: member.updatedAt,

			user: userPresenter.present(member.user),

			role: rolePresenter.present(member.role),
		};
	}

	presentMany(members) {
		return members.map((member) => this.present(member));
	}
}

export default new BusinessMemberPresenter();
