import type { Direction } from '../config/dancer';

export type MovementState = {
  x: number;
  y: number;
  targetX: number | null;
  targetY: number | null;
  state: 'idle' | 'walking';
  direction: Direction;
  speed: number;
};

const TARGET_FPS = 60;

export function movementSystem(s: MovementState, delta: number): void {
  if (s.targetX === null || s.targetY === null) return;

  const dx = s.targetX - s.x;
  const dy = s.targetY - s.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < s.speed * (delta / TARGET_FPS) || dist < 2) {
    s.x = s.targetX;
    s.y = s.targetY;
    s.targetX = null;
    s.targetY = null;
    s.state = 'idle';
    return;
  }

  const step = s.speed * (delta / TARGET_FPS);
  s.x += (dx / dist) * step;
  s.y += (dy / dist) * step;
  s.state = 'walking';
  s.direction = getDirection(dx, dy);
}

// screen-y+ maps to iso-front (toward camera), screen-y- maps to iso-back
function getDirection(dx: number, dy: number): Direction {
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  if (angle > -45 && angle <= 45) return 'right';
  if (angle > 45 && angle <= 135) return 'front';
  if (angle > 135 || angle <= -135) return 'left';
  return 'back';
}
