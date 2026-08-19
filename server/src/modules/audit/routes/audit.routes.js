import { Router } from "express";
import auditLogController from "../controllers/auditLog.controller.js";
import authenticate from "../../identity/middleware/authenticate.js";
import requirePermission from "../../identity/middleware/requirePermission.js";
import { Permissions } from "../../../shared/index.js";

/**
 * BUSINESS_VIEW initially. Later:
 * - AUDIT_VIEW
 * - AUDIT_EXPORT
 * - AUDIT_DELETE
 */

const router = Router();

router.use(authenticate);

router.get(
	"/businesses/:businessId/audit-logs",
	requirePermission(Permissions.BUSINESS_VIEW),
	auditLogController.listBusinessLogs,
);

export default router;
