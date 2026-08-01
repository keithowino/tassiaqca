import { Router } from "express";

import * as controller from "../controllers/navigation.controller.js";

import { validateRequest } from "../../../shared/validation/index.js";

import { navigationParamsSchema } from "../validators/navigation.validator.js";

const router = Router({ mergeParams: true });

router.get("/navigation", async (req, res) => {
	validateRequest(
		{
			params: navigationParamsSchema,
		},
		req,
	);

	return controller.getNavigation(req, res);
});

export default router;
