import express from "express";
import authRoutes from "./auth-routes";
import fixtureRoutes from "./fixture-routes";
import teamRoutes from "./team-routes";
import searchRoutes from "./search-routes";

const router = express.Router();

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/teams", teamRoutes);
router.use("/api/v1/fixtures", fixtureRoutes);
router.use("/api/v1/search", searchRoutes);

export default router;
