import { world } from '../world';

const query = world.with('graphics', 'position');

// Sync Pixi Graphics transform from Position. Tint by state.
export function renderSystem(): void {
  for (const e of query) {
    e.graphics.x = e.position.x;
    e.graphics.y = e.position.y;
    e.graphics.alpha = e.state === 'colliding' ? 0.5 : 1.0;
  }
}
