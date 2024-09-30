import { Request, Response } from "express";
import Audit from "../models/audit";

interface Coordinates {
  x: number;
  y: number;
}

interface ScanPoint {
  coordinates: Coordinates;
  enemies: { type: "soldier" | "mech"; number: number };
  allies?: number;
}

interface RadarRequest {
  protocols: string[];
  scan: ScanPoint[];
}

const calculateDistance = (
  point1: Coordinates,
  point2: Coordinates
): number => {
  return Math.sqrt(
    Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
  );
};

const MAX_DISTANCE = 100;
const origin = { x: 0, y: 0 };

const radarScan = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { protocols, scan }: RadarRequest = req.body;

    let validPoints = scan.filter(
      (point) => calculateDistance(origin, point.coordinates) <= MAX_DISTANCE
    );

    let target: ScanPoint | null = null;

    if (
      protocols.includes("prioritize-mech") &&
      validPoints.filter((point) => point.enemies.type === "mech").length > 0
    ) {
      {
        validPoints = validPoints.filter(
          (point) => point.enemies.type === "mech"
        );
      }
    }
    if (protocols.includes("avoid-mech")) {
      validPoints = validPoints.filter(
        (point) => point.enemies.type !== "mech"
      );
    }
    if (protocols.includes("assist-allies")) {
      target = validPoints.find((point) => point.allies) || null;
    }
    if (protocols.includes("avoid-crossfire")) {
      validPoints = validPoints.filter((point) => !point.allies);
    }
    if (protocols.includes("closest-enemies")) {
      target = validPoints.reduce((closest, point) => {
        return calculateDistance(origin, point.coordinates) <
          calculateDistance(origin, closest.coordinates)
          ? point
          : closest;
      }, validPoints[0]);
    }
    if (protocols.includes("furthest-enemies")) {
      target = validPoints.reduce((furthest, point) => {
        return calculateDistance(origin, point.coordinates) >
          calculateDistance(origin, furthest.coordinates)
          ? point
          : furthest;
      }, validPoints[0]);
    }
    if (validPoints.length === 1) {
      target = validPoints[0];
    }
    if (!target) {
      return res.status(404).json({ message: "No valid targets found" });
    }
    const result = {
      // se ve feo pero esto lo hize para que X siempre sea el primer dato
      x: target.coordinates.x,
      y: target.coordinates.y,
    };

    const auditEntry = new Audit({ protocols, scan, result });
    await auditEntry.save();

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export { radarScan };
