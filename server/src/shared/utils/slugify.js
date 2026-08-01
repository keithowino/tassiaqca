/**
 * Centralize slug generation.
 */
export default function slugify(value) {
	return value
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");
}
