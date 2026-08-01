import { z } from "zod";
import {
	emailSchema,
	passwordSchema,
} from "../../../shared/validation/index.js";

const loginRequestSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
});

export default loginRequestSchema;
