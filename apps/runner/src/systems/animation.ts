import type { AnimatedSprite, Container } from 'pixi.js';
import type { Direction, AnimState } from '../config/dancer';

export type AnimationState = {
  state: AnimState;
  direction: Direction;
  currentKey: string;
  sprites: Record<string, AnimatedSprite>;
  activeSprite: AnimatedSprite | null;
};

export function animationSystem(
  anim: AnimationState,
  container: Container,
  x: number,
  y: number,
): void {
  const key = `${anim.state}_${anim.direction}`;

  if (key !== anim.currentKey) {
    if (anim.activeSprite) {
      container.removeChild(anim.activeSprite);
      anim.activeSprite.stop();
    }
    const next = anim.sprites[key];
    if (next) {
      container.addChild(next);
      next.play();
      anim.activeSprite = next;
      anim.currentKey = key;
    }
  }

  if (anim.activeSprite) {
    anim.activeSprite.x = x;
    anim.activeSprite.y = y;
  }
}
