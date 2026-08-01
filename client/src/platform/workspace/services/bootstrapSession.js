let bootstrapState = null;

const bootstrapSession = {
	begin(state) {
		bootstrapState = state;
	},

	get() {
		return bootstrapState;
	},

	clear() {
		bootstrapState = null;
	},
};

export default bootstrapSession;
