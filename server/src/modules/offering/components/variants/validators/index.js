export {
	default as variantsSchema,
	variantSchema,
	variantsSchema as variantsRequestSchema,
	variantsListQuerySchema,
} from "./variants.schema.js";

export {
	normalizeVariant,
	normalizeVariants,
	normalizeVariantAttributes,
} from "./variants.normalizer.js";
