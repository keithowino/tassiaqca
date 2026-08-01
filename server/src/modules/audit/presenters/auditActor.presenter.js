class AuditActorPresenter {
	present(actor) {
		if (!actor) {
			return null;
		}

		return {
			id: actor.id,
			firstName: actor.firstName,
			lastName: actor.lastName,
			email: actor.email,
			avatar: actor.avatar,
		};
	}
}

export default new AuditActorPresenter();
