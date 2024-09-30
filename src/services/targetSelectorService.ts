interface ScanData {
  coordinates: { x: number; y: number };
  enemies: { type: string; number: number };
  allies?: number;
}

export const selectTarget = (
  protocols: string[],
  scan: ScanData[]
): { x: number; y: number } => {
  if (protocols.includes("closest-enemies")) {
    let closest = scan[0];
    for (const point of scan) {
      const distanceCurrent = Math.sqrt(
        Math.pow(closest.coordinates.x, 2) + Math.pow(closest.coordinates.y, 2)
      );
      const distanceNew = Math.sqrt(
        Math.pow(point.coordinates.x, 2) + Math.pow(point.coordinates.y, 2)
      );
      if (distanceNew < distanceCurrent) closest = point;
    }
    return closest.coordinates;
  }
  return { x: 0, y: 0 };
};
