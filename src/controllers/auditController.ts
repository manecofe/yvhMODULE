import { Request, Response } from "express";
import Audit from "../models/audit";

const getAudits = async (req: Request, res: Response) => {
  try {
    const audits = await Audit.find();
    return res.json(audits);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener los registros de auditoría" });
  }
};

const getAuditById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const audit = await Audit.findById(id);

    if (!audit) {
      return res
        .status(404)
        .json({ message: "Registro de auditoría no encontrado" });
    }

    return res.json(audit);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener el registro de auditoría" });
  }
};

const deleteAuditById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const audit = await Audit.findByIdAndDelete(id);
  if (!audit) {
    return res.status(404).json({ message: "Audit not found" });
  }
  return res.json({ message: "Audit deleted successfully" });
};

export { getAudits, getAuditById, deleteAuditById };
