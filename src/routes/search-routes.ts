import { Router } from "express";
import { searchController } from "../controllers";

const router = Router();

router.get("/:searchValue", searchController);

export default router;
