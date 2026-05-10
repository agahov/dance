import { Events } from 'matter-js';
import type { Engine, Body } from 'matter-js';
import { world } from './world';
import type { Entity } from './world';

// Matter overlap listener. THIN — only mutates `state`.
// Business logic lives in systems that query state values.

function entityFor(body: Body): Entity | undefined {
  for (const e of world.entities) if (e.body === body) return e;
  return undefined;
}

export function attachListener(engine: Engine): void {
  Events.on(engine, 'collisionStart', (event) => {
    for (const pair of event.pairs) {
      const a = entityFor(pair.bodyA);
      const b = entityFor(pair.bodyB);
      if (a) world.removeComponent(a, 'state'), world.addComponent(a, 'state', 'colliding');
      if (b) world.removeComponent(b, 'state'), world.addComponent(b, 'state', 'colliding');
    }
  });

  Events.on(engine, 'collisionEnd', (event) => {
    for (const pair of event.pairs) {
      const a = entityFor(pair.bodyA);
      const b = entityFor(pair.bodyB);
      if (a) world.removeComponent(a, 'state'), world.addComponent(a, 'state', 'idle');
      if (b) world.removeComponent(b, 'state'), world.addComponent(b, 'state', 'idle');
    }
  });
}
