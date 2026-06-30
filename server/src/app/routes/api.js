import { Router } from "express";
// import authRoutes from "../../modules/auth/index.js";
import identityRoutes from "../../modules/identity/index.js";

const router = Router();

router.get("/health", (req, res) => {
	res.json({
		success: true,
		message: "API is healthy",
	});
});

// router.use("/auth", authRoutes);
router.use("/auth", identityRoutes);

export default router;
