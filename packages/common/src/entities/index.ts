import type { PositionComponent, VelocityComponent, RenderableComponent } from '../components';

export type BaseEntity = {
  position: PositionComponent;
  velocity: VelocityComponent;
  renderable: RenderableComponent;
};
