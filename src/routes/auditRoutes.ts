import { Router } from "express";
import {
  getAudits,
  getAuditById,
  deleteAuditById,
} from "../controllers/auditController";

const router = Router();

router.get("/", (req, res, next) => {
  getAudits(req, res).catch(next);
});

router.get("/:id", (req, res, next) => {
  getAuditById(req, res).catch(next);
});

router.delete("/:id", (req, res, next) => {
  deleteAuditById(req, res).catch(next);
});

export default router;
