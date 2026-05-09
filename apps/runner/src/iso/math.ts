export const TILE_W = 80;
export const TILE_H = 40;

export function isoToScreen(tileX: number, tileY: number): { x: number; y: number } {
  return {
    x: (tileX - tileY) * (TILE_W / 2),
    y: (tileX + tileY) * (TILE_H / 2),
  };
}

export function screenToIso(screenX: number, screenY: number): { x: number; y: number } {
  return {
    x: screenX / TILE_W + screenY / TILE_H,
    y: screenY / TILE_H - screenX / TILE_W,
  };
}
