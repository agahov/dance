import { World } from 'miniplex';
import type { Body } from 'matter-js';
import type { Graphics } from 'pixi.js';

// Component-kind classification (convention, see ADR-0001).
//   tag      — boolean labels, many per entity
//   state    — exactly one per entity
//   data     — typed payload, one per type
//   relation — entity reference

export type ShapeCircle = { kind: 'circle'; radius: number; color: number };
export type ShapeRect = { kind: 'rect'; width: number; height: number; color: number };
export type Shape = ShapeCircle | ShapeRect;

export type Entity = {
  // data
  position?: { x: number; y: number };
  velocity?: { vx: number; vy: number };
  shape?: Shape;
  body?: Body;
  graphics?: Graphics;

  // state (exactly one of these set at a time)
  state?: 'idle' | 'colliding';

  // tags (presence = label applied)
  physics?: true;
  kinematic?: true;
  geometry?: true;

  // relations (future)
  // target?: Entity;
};

export const world = new World<Entity>();
