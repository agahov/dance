import { Bodies, Body, Composite } from 'matter-js';
import type { Engine } from 'matter-js';
import { Graphics } from 'pixi.js';
import type { Container } from 'pixi.js';
import { CONFIG } from './config';
import { world } from './world';
import type { Entity, Shape } from './world';

// Build Matter body from shape + position. Generic — driven by component data only.
function makeBody(shape: Shape, x: number, y: number, isPhysics: boolean): Body {
  const opts = {
    restitution: CONFIG.matter.restitution,
    frictionAir: CONFIG.matter.frictionAir,
    friction: 0,
    isStatic: !isPhysics, // kinematic/geometry default to static; refine when those tags ship
  };
  return shape.kind === 'circle'
    ? Bodies.circle(x, y, shape.radius, opts)
    : Bodies.rectangle(x, y, shape.width, shape.height, opts);
}

function makeGraphics(shape: Shape): Graphics {
  const g = new Graphics();
  g.beginFill(shape.color);
  if (shape.kind === 'circle') g.drawCircle(0, 0, shape.radius);
  else g.drawRect(-shape.width / 2, -shape.height / 2, shape.width, shape.height);
  g.endFill();
  return g;
}

export function spawnEntity(entity: Entity, engine: Engine, stage: Container): void {
  if (entity.shape && entity.position) {
    const body = makeBody(entity.shape, entity.position.x, entity.position.y, !!entity.physics);
    if (entity.velocity) Body.setVelocity(body, { x: entity.velocity.vx, y: entity.velocity.vy });
    Composite.add(engine.world, body);
    entity.body = body;

    const g = makeGraphics(entity.shape);
    g.x = entity.position.x;
    g.y = entity.position.y;
    stage.addChild(g);
    entity.graphics = g;
  }
  world.add(entity);
}

export function spawnArenaWalls(engine: Engine): void {
  const { width, height } = CONFIG.screen;
  const t = CONFIG.arena.wallThickness;
  const opts = { isStatic: true, restitution: CONFIG.matter.restitution, friction: 0 };
  Composite.add(engine.world, [
    Bodies.rectangle(width / 2, -t / 2, width, t, opts),
    Bodies.rectangle(width / 2, height + t / 2, width, t, opts),
    Bodies.rectangle(-t / 2, height / 2, t, height, opts),
    Bodies.rectangle(width + t / 2, height / 2, t, height, opts),
  ]);
}
