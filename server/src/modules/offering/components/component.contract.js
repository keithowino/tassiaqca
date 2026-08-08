/**
 * Offering Component Contract
 *
 * Every reusable offering component (Pricing, Inventory, Media,
 * Scheduling, Registration, etc.) implements this contract.
 *
 * Components participate in the Offering lifecycle through
 * validation hooks and lifecycle hooks executed by the
 * Component Pipeline.
 *
 * Implementations may override only the hooks they require.
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
