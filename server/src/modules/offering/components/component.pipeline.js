import { resolveComponents } from "../../../shared/index.js";

/**
 * Executes a hook across every component
 * declared by an offering registration.
 *
 * Components are executed in registry order.
 *
 * The pipeline is completely generic. It knows nothing
 * about Pricing, Inventory, Media, Booking, etc.
 * It simply executes whichever hook is exposed by the
 * registered component implementation.
 */

async function execute(hook, context) {
	const { registration } = context;

	if (!registration) {
		return;
	}

	const components = resolveComponents(registration);

	for (const component of components) {
		const handler = component?.[hook];

		if (typeof handler !== "function") {
			continue;
		}

		await handler(context);
	}
}

/*
|--------------------------------------------------------------------------
| Validation
|--------------------------------------------------------------------------
*/

const validateCreate = (context) => execute("validateCreate", context);

const validateUpdate = (context) => execute("validateUpdate", context);

/*
|--------------------------------------------------------------------------
| Preparation
|--------------------------------------------------------------------------
*/

const prepareCreate = (context) => execute("prepareCreate", context);

const prepareUpdate = (context) => execute("prepareUpdate", context);

/*
|--------------------------------------------------------------------------
| Lifecycle
|--------------------------------------------------------------------------
*/

const beforeCreate = (context) => execute("beforeCreate", context);

const afterCreate = (context) => execute("afterCreate", context);

const beforeUpdate = (context) => execute("beforeUpdate", context);

const afterUpdate = (context) => execute("afterUpdate", context);

const beforeArchive = (context) => execute("beforeArchive", context);

const afterArchive = (context) => execute("afterArchive", context);

const beforeRestore = (context) => execute("beforeRestore", context);

const afterRestore = (context) => execute("afterRestore", context);

export default {
	validateCreate,
	validateUpdate,

	prepareCreate,
	prepareUpdate,

	beforeCreate,
	afterCreate,

	beforeUpdate,
	afterUpdate,

	beforeArchive,
	afterArchive,

	beforeRestore,
	afterRestore,
};
