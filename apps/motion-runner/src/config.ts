import type { Entity } from './world';

export const CONFIG = {
  screen: { width: 1280, height: 780 },
  arena: { wallThickness: 40 },
  pixi: {
    antialias: true,
    backgroundColor: 0x101015,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
  },
  matter: {
    // No gravity. Sandbox.
    gravity: { x: 0, y: 0, scale: 0 },
    restitution: 1,
    frictionAir: 0,
  },
} as const;

// Initial entities. Declarative — no hardcoded creation in code.
export const INITIAL_ENTITIES: Entity[] = [
  {
    position: { x: 300, y: 300 },
    velocity: { vx: 4, vy: 2 },
    shape: { kind: 'circle', radius: 20, color: 0xff5577 },
    state: 'idle',
    physics: true,
  },
  {
    position: { x: 600, y: 400 },
    velocity: { vx: -3, vy: 3 },
    shape: { kind: 'circle', radius: 30, color: 0x55ddff },
    state: 'idle',
    physics: true,
  },
  {
    position: { x: 900, y: 200 },
    velocity: { vx: 2, vy: -4 },
    shape: { kind: 'circle', radius: 25, color: 0xffdd55 },
    state: 'idle',
    physics: true,
  },
  {
    position: { x: 500, y: 600 },
    velocity: { vx: -2, vy: -3 },
    shape: { kind: 'rect', width: 60, height: 60, color: 0x88ff88 },
    state: 'idle',
    physics: true,
  },
];
