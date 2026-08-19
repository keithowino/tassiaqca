import { Router } from "express";

import * as controller from "../controllers/dashboard.controller.js";

import { validateRequest } from "../../../shared/index.js";

import { dashboardParamsSchema } from "../validators/dashboard.validator.js";

const router = Router({ mergeParams: true });

router.get("/dashboard", async (req, res) => {
	validateRequest(
		{
			params: dashboardParamsSchema,
		},
		req,
	);

	return controller.getDashboard(req, res);
});

export default router;
