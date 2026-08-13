/**
 * Offering Component Contract
 *
 * Components own their own data and participate in the
 * Offering lifecycle through the Component Pipeline.
 */

const noop = async () => {};

export const componentContract = Object.freeze({
	/*
	|--------------------------------------------------------------------------
	| Validation
	|--------------------------------------------------------------------------
	*/

	async validateCreate() {
		return noop();
	},

	async validateUpdate() {
		return noop();
	},

	/*
	|--------------------------------------------------------------------------
	| Preparation
	|--------------------------------------------------------------------------
	|
	| Components may normalize/prepare their own data here.
	| They must not inject component-owned fields into
	| the Offering document.
	|
	*/

	async prepareCreate() {
		return noop();
	},

	async prepareUpdate() {
		return noop();
	},

	/*
	|--------------------------------------------------------------------------
	| Lifecycle
	|--------------------------------------------------------------------------
	*/

	async beforeCreate() {
		return noop();
	},

	async afterCreate() {
		return noop();
	},

	async beforeUpdate() {
		return noop();
	},

	async afterUpdate() {
		return noop();
	},

	async beforeArchive() {
		return noop();
	},

	async afterArchive() {
		return noop();
	},

	async beforeRestore() {
		return noop();
	},

	async afterRestore() {
		return noop();
	},
});

export default componentContract;
