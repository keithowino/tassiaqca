class UserPresenter {
	public(user) {
		return {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			avatar: user.avatar ?? null,
		};
	}
}

export default new UserPresenter();
