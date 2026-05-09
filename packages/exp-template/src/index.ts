import type { Application } from 'pixi.js';

export interface Experiment {
  name: string;
  init(app: Application): void;
  update(delta: number): void;
  destroy(): void;
}

export class TemplateExperiment implements Experiment {
  readonly name = 'template';

  init(_app: Application): void {
    // setup scene
  }

  update(_delta: number): void {
    // per-frame logic
  }

  destroy(): void {
    // cleanup
  }
}
