import { Router } from "express";
import identityRoutes from "../../modules/identity/index.js";
import businessRoutes from "../../modules/business/index.js";

const router = Router();

router.get("/health", (req, res) => {
	res.json({
		success: true,
		message: "API is healthy",
	});
});

router.use("/auth", identityRoutes);
router.use("/businesses", businessRoutes);

export default router;
