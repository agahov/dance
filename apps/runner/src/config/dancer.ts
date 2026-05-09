export type Direction = 'front' | 'back' | 'left' | 'right';
export type AnimState = 'idle' | 'walking';

export type AnimDef = {
  sheet: 'idle' | 'walk';
  row: number;
  frames: number;
  speed: number;
  loop: boolean;
  flipX: boolean;
};

export type AnimationConfig = Record<AnimState, Record<Direction, AnimDef>>;
//1531
//887
// Frame dimensions — 1774×887 sheet, 6 cols × 2 rows.
// 1774/6 ≈ 295.67 — adjust frameW if frames appear misaligned.
export const DANCER = {
  sheets: {
    // idle: '/skirt-dancer/tp/idle.png',
    // walk: '/skirt-dancer/tp/walk.png',
    idle: '/skirt-dancer/tp/idle_walk.png',
    walk: '/skirt-dancer/tp/idle_walk.png',
  },
  //frameW: 255,
  frameW: 192,
  //frameH: 443,
  frameH: 304,
  scale: 0.25,
  speed: 100,
  arrivalThreshold: 10,
} as const;

// row 0 = front, row 1 = right; left/back are mirrored via flipX
export const ANIMATIONS: AnimationConfig = {
  idle: {
    front: { sheet: 'idle', row: 0, frames: 6, speed: 0.08, loop: true, flipX: false },
    back:  { sheet: 'idle', row: 0, frames: 6, speed: 0.08, loop: true, flipX: true },
    right: { sheet: 'idle', row: 1, frames: 6, speed: 0.08, loop: true, flipX: false },
    left:  { sheet: 'idle', row: 1, frames: 6, speed: 0.08, loop: true, flipX: true },
  },
  walking: {
    front: { sheet: 'walk', row: 2, frames: 6, speed: 0.14, loop: true, flipX: false },
    back:  { sheet: 'walk', row: 2, frames: 6, speed: 0.14, loop: true, flipX: true },
    right: { sheet: 'walk', row: 3, frames: 6, speed: 0.14, loop: true, flipX: false },
    left:  { sheet: 'walk', row: 3, frames: 6, speed: 0.14, loop: true, flipX: true },
  },
};
