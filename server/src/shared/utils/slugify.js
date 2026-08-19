/**
 * Centralize slug generation.
 */
export default function slugify(value) {
	return value
		?.trim()
		.toLowerCase()
		.replace(/[^\w\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");
}
