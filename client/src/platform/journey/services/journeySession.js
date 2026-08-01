// let currentIntent = null;

// const journeySession = {
// 	begin(intent) {
// 		currentIntent = intent;
// 	},

// 	get() {
// 		return currentIntent;
// 	},

// 	clear() {
// 		currentIntent = null;
// 	},
// };

// export default journeySession;

const STORAGE_KEY = "platform.journey.intent";

const journeySession = {
	begin(intent) {
		sessionStorage.setItem(STORAGE_KEY, intent);
	},

	get() {
		return sessionStorage.getItem(STORAGE_KEY);
	},

	clear() {
		sessionStorage.removeItem(STORAGE_KEY);
	},
};

export default journeySession;
