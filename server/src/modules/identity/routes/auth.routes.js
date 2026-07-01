import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import refreshRequestSchema from "../validators/refresh.validator.js";
import authenticate from "../middleware/authenticate.js";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.get("/me", authenticate, authController.me);

export default router;
