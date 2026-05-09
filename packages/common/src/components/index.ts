import type { Body } from 'matter-js';

export type PositionComponent = { x: number; y: number };
export type VelocityComponent = { vx: number; vy: number };
export type PhysicsBodyComponent = { body: Body };
export type RenderableComponent = { visible: boolean; alpha: number };
export type TagComponent = { tag: string };
