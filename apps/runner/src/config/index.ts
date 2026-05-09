export const CONFIG = {
  screen: {
    width: 1280,
    height: 780,
  },
  physics: {
    gravity: { x: 0, y: 1 },
    enableSleeping: false,
  },
  pixi: {
    antialias: true,
    backgroundColor: 0x000000,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
  },
} as const;

export type Config = typeof CONFIG;
