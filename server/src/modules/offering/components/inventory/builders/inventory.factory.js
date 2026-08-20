import buildInventory from "./inventory.builder.js";

export function createInventory(payload) {
	return buildInventory(payload);
}

export default {
	createInventory,
};
