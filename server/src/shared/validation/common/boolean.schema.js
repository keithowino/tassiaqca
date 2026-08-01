import { z } from "zod";

const booleanSchema = z.preprocess((value) => {
	if (value === true || value === "true") {
		return true;
	}

	if (value === false || value === "false") {
		return false;
	}

	return value;
}, z.boolean());

export default booleanSchema;
