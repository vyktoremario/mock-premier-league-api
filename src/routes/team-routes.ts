import { Router } from "express";
import {
  getATeamController,
  getAllTeamController,
  addTeamController,
  updateTeamController,
  removeTeamController,
} from "../controllers";

import {
  checkUserToken,
  verifyUserToken,
  verifyUserRole,
} from "../middlewares/auth-middleware";

const router = Router();

router.get("/", checkUserToken, verifyUserToken, getAllTeamController);
router.get("/:id", checkUserToken, verifyUserToken, getATeamController);
router.post(
  "/create",
  checkUserToken,
  verifyUserToken,
  verifyUserRole,
  addTeamController
);
router.patch(
  "/:id",
  checkUserToken,
  verifyUserToken,
  verifyUserRole,
  updateTeamController
);
router.delete(
  "/:id",
  checkUserToken,
  verifyUserToken,
  verifyUserRole,
  removeTeamController
);

export default router;
