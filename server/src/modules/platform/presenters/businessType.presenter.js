export const businessTypePresenter = {
	present(businessType) {
		if (!businessType) {
			return null;
		}

		/**
		 * Later, if you build an administration interface that needs the full registry definition, you can introduce a dedicated presenter (for example, businessTypeAdministrationPresenter) rather than overloading the onboarding contract. This keeps each API response purpose-specific and aligns with the Architecture Specification's emphasis on stable contracts between platform layers
		 */
		return {
			id: businessType.id,

			name: businessType.name,

			description: businessType.description,

			icon: businessType.metadata?.icon,

			color: businessType.metadata?.color,

			illustration: businessType.metadata?.illustration,

			category: businessType.metadata?.category,

			onboarding: businessType.metadata?.onboarding,
		};
	},

	presentMany(businessTypes) {
		return businessTypes.map((businessType) => this.present(businessType));
	},
};
