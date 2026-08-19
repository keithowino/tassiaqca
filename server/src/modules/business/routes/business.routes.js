import { Router } from "express";

import {
	branchAssignmentController,
	branchController,
	businessController,
	businessMemberController,
} from "../controllers/index.js";

import authenticate from "../../identity/middleware/authenticate.js";
import requirePermission from "../../identity/middleware/requirePermission.js";
import { Permissions } from "../../../shared/index.js";

const router = Router();

router.post("/", authenticate, businessController.create);
router.get("/", authenticate, businessController.list);
router.get("/:businessId", authenticate, businessController.get);
router.get(
	"/:businessId/configuration",
	authenticate,
	businessController.configuration,
);
router.patch(
	"/:businessId",
	authenticate,
	requirePermission(Permissions.BRANCH_UPDATE),
	businessController.update,
);
router.post(
	"/:businessId/members",
	authenticate,
	requirePermission(Permissions.MEMBER_INVITE),
	businessMemberController.invite,
);
router.get(
	"/:businessId/members",
	authenticate,
	requirePermission(Permissions.MEMBER_VIEW),
	businessMemberController.list,
);
router.delete(
	"/:businessId/members/:memberId",
	authenticate,
	requirePermission(Permissions.MEMBER_REMOVE),
	businessMemberController.remove,
);
router.patch(
	"/:businessId/members/:memberId/deactivate",
	authenticate,
	requirePermission(Permissions.MEMBER_REMOVE),
	businessMemberController.deactivate,
);

router.patch(
	"/:businessId/members/:memberId/reactivate",
	authenticate,
	requirePermission(Permissions.MEMBER_INVITE),
	businessMemberController.reactivate,
);
router.patch(
	"/:businessId/members/:memberId/role",
	authenticate,
	requirePermission(Permissions.MEMBER_ROLE_UPDATE),
	businessMemberController.changeRole,
);
router.post("/:businessId/leave", authenticate, businessMemberController.leave);
router.patch(
	"/:businessId/ownership/:memberId",
	authenticate,
	requirePermission(Permissions.BUSINESS_TRANSFER_OWNERSHIP),
	businessMemberController.transferOwnership,
);

/**
 * #### Branches
 * Grouping routes by resource and then by operation makes the file much easier to navigate as the module grows.
 */
/**
|--------------------------------------------------
| Branches
|	├── POST    /branches
|	├── GET     /branches
|	├── PATCH   /branches/:branchId
|	├── PATCH   /branches/:branchId/deactivate
|	└── PATCH   /branches/:branchId/reactivate
|--------------------------------------------------
*/
router.get(
	"/:businessId/branches",
	authenticate,
	requirePermission(Permissions.BRANCH_VIEW),
	branchController.list,
);
router.post(
	"/:businessId/branches",
	authenticate,
	requirePermission(Permissions.BRANCH_CREATE),
	branchController.create,
);
router.patch(
	"/:businessId/branches/:branchId",
	authenticate,
	requirePermission(Permissions.BRANCH_UPDATE),
	branchController.update,
);
router.patch(
	"/:businessId/branches/:branchId/deactivate",
	authenticate,
	requirePermission(Permissions.BRANCH_DEACTIVATE),
	branchController.deactivate,
);
router.patch(
	"/:businessId/branches/:branchId/reactivate",
	authenticate,
	requirePermission(Permissions.BRANCH_REACTIVATE),
	branchController.reactivate,
);
router.post(
	"/:businessId/branches/:branchId/members",
	authenticate,
	requirePermission(Permissions.BRANCH_MEMBER_ASSIGN),
	branchAssignmentController.assign,
);
router.get(
	"/:businessId/branches/:branchId/members",
	authenticate,
	requirePermission(Permissions.MEMBER_VIEW),
	branchAssignmentController.listBranchMembers,
);
router.get(
	"/:businessId/members/:memberId/branches",
	authenticate,
	requirePermission(Permissions.MEMBER_VIEW),
	branchAssignmentController.listMemberBranches,
);
router.patch(
	"/:businessId/branches/:branchId/members/:memberId/deactivate",
	authenticate,
	requirePermission(Permissions.MEMBER_ROLE_UPDATE),
	branchAssignmentController.deactivate,
);
router.patch(
	"/:businessId/branches/:branchId/members/:memberId/reactivate",
	authenticate,
	requirePermission(Permissions.MEMBER_ROLE_UPDATE),
	branchAssignmentController.reactivate,
);
router.patch(
	"/:businessId/branches/:branchId/members/:memberId/primary",
	authenticate,
	requirePermission(Permissions.MEMBER_ROLE_UPDATE),
	branchAssignmentController.setPrimary,
);

export default router;
