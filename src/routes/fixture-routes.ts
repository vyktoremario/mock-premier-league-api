import { Router } from "express";
import {
  addFixtureController,
  getAllFixtureController,
  getAllPendingFixtureController,
  getAllCompletedFixtureController,
  getAFixtureController,
  updateFixtureController,
  removeFixtureController,
} from "../controllers";

import {
  checkUserToken,
  verifyUserToken,
  verifyUserRole,
} from "../middlewares/auth-middleware";

const router = Router();

router.get(
  "/pending",
  checkUserToken,
  verifyUserToken,
  getAllPendingFixtureController
);
router.get(
  "/completed",
  checkUserToken,
  verifyUserToken,
  getAllCompletedFixtureController
);
router.get("/:id", checkUserToken, verifyUserToken, getAFixtureController);
router.get("/", checkUserToken, verifyUserToken, getAllFixtureController);
router.post(
  "/create",
  checkUserToken,
  verifyUserToken,
  verifyUserRole,
  addFixtureController
);
router.patch(
  "/:id",
  checkUserToken,
  verifyUserToken,
  verifyUserRole,
  updateFixtureController
);
router.delete(
  "/:id",
  checkUserToken,
  verifyUserToken,
  verifyUserRole,
  removeFixtureController
);

export default router;
