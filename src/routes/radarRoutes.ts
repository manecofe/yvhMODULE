import { Router } from "express";
import { radarScan } from "../controllers/radarController";

const router = Router();

router.post("/", (req, res, next) => {
  radarScan(req, res).catch(next);
});

export default router;
