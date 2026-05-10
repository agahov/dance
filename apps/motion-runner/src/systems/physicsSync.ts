import { world } from '../world';

const query = world.with('body', 'position');

// Copy Matter body pose → Position. Generic; ignores tags.
export function physicsSyncSystem(): void {
  for (const e of query) {
    e.position.x = e.body.position.x;
    e.position.y = e.body.position.y;
  }
}
