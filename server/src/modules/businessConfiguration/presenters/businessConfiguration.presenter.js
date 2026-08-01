class BusinessConfigurationPresenter {
	present(configuration) {
		if (!configuration) {
			return null;
		}

		return {
			businessId: configuration.business,
			businessType: configuration.businessType,

			modules: configuration.modules,

			capabilities: configuration.capabilities,

			featureFlags: configuration.featureFlags,

			metadata: configuration.metadata,
		};
	}
}

export default new BusinessConfigurationPresenter();
