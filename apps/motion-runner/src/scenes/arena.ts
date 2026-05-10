import { Container } from 'pixi.js';
import type { Application } from 'pixi.js';
import { Engine } from 'matter-js';
import { CONFIG } from '../config';
import { INITIAL_ENTITIES } from '../config';
import { spawnEntity, spawnArenaWalls } from '../factory';
import { attachListener } from '../listener';
import { physicsSyncSystem } from '../systems/physicsSync';
import { renderSystem } from '../systems/render';

export class ArenaScene {
  readonly name = 'arena';
  private app!: Application;
  private stage!: Container;
  private engine!: Engine;

  init(app: Application): void {
    this.app = app;
    this.stage = new Container();
    app.stage.addChild(this.stage);

    this.engine = Engine.create({ gravity: CONFIG.matter.gravity });

    spawnArenaWalls(this.engine);
    attachListener(this.engine);

    for (const cfg of INITIAL_ENTITIES) {
      // Clone so config stays immutable across hot-reload.
      spawnEntity({ ...cfg }, this.engine, this.stage);
    }
  }

  update(delta: number): void {
    Engine.update(this.engine, (1000 / 60) * delta);
    physicsSyncSystem();
    renderSystem();
  }

  destroy(): void {
    this.app.stage.removeChild(this.stage);
    this.stage.destroy({ children: true });
  }
}
