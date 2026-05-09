import {
  Application,
  Assets,
  AnimatedSprite,
  Container,
  Graphics,
  Rectangle,
  Texture,
} from 'pixi.js';
import type { FederatedPointerEvent } from 'pixi.js';
import { DANCER, ANIMATIONS } from '../config/dancer';
import type { AnimState, Direction } from '../config/dancer';
import { isoToScreen, TILE_W, TILE_H } from '../iso/math';
import { movementSystem } from '../systems/movement';
import type { MovementState } from '../systems/movement';
import { animationSystem } from '../systems/animation';
import type { AnimationState } from '../systems/animation';

const GRID_COLS = 16;
const GRID_ROWS = 12;
// Origin centers the grid on a 1280×780 canvas
const GRID_ORIGIN_X = 560;
const GRID_ORIGIN_Y = 130;

export class ArenaExperiment {
  readonly name = 'arena';
  private app!: Application;
  private stage!: Container;
  private mov!: MovementState;
  private anim!: AnimationState;
  private readonly handleClick: (e: FederatedPointerEvent) => void;

  constructor() {
    this.handleClick = (e: FederatedPointerEvent) => {
      this.mov.targetX = e.global.x;
      this.mov.targetY = e.global.y;
    };
  }

  async init(app: Application): Promise<void> {
    this.app = app;
    this.stage = new Container();
    app.stage.addChild(this.stage);

    const grid = new Graphics();
    this.drawGrid(grid);
    this.stage.addChild(grid);

    const [idleTex, walkTex] = await Promise.all([
      Assets.load<Texture>(DANCER.sheets.idle),
      Assets.load<Texture>(DANCER.sheets.walk),
    ]);

    const sources: Record<'idle' | 'walk', Texture> = { idle: idleTex, walk: walkTex };
    const sprites: Record<string, AnimatedSprite> = {};

    for (const stateName of Object.keys(ANIMATIONS) as AnimState[]) {
      for (const dir of Object.keys(ANIMATIONS[stateName]) as Direction[]) {
        const def = ANIMATIONS[stateName][dir];
        const frames = this.sliceFrames(sources[def.sheet], def.row, def.frames);
        const sprite = new AnimatedSprite(frames, false);
        sprite.animationSpeed = def.speed;
        sprite.loop = def.loop;
        sprite.anchor.set(0.5, 1.0);
        const sx = def.flipX ? -DANCER.scale : DANCER.scale;
        sprite.scale.set(sx, DANCER.scale);
        sprites[`${stateName}_${dir}`] = sprite;
      }
    }

    const spawnX = app.screen.width / 2;
    const spawnY = app.screen.height / 2;

    this.mov = {
      x: spawnX,
      y: spawnY,
      targetX: null,
      targetY: null,
      state: 'idle',
      direction: 'front',
      speed: DANCER.speed,
    };

    this.anim = {
      state: 'idle',
      direction: 'front',
      currentKey: '',
      sprites,
      activeSprite: null,
    };

    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;
    app.stage.on('pointerdown', this.handleClick);
  }

  update(delta: number): void {
    movementSystem(this.mov, delta);
    this.anim.state = this.mov.state;
    this.anim.direction = this.mov.direction;
    animationSystem(this.anim, this.stage, this.mov.x, this.mov.y);
    this.anim.activeSprite?.update(delta);
  }

  destroy(): void {
    this.app.stage.off('pointerdown', this.handleClick);
    this.app.stage.removeChild(this.stage);
    this.stage.destroy({ children: true });
  }

  private drawGrid(g: Graphics): void {
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        const { x, y } = isoToScreen(col, row);
        const sx = GRID_ORIGIN_X + x;
        const sy = GRID_ORIGIN_Y + y;
        const color = (row + col) % 2 === 0 ? 0x4a5568 : 0x2d3748;
        g.beginFill(color);
        g.lineStyle(1, 0x1a202c, 0.8);
        g.moveTo(sx, sy - TILE_H / 2);
        g.lineTo(sx + TILE_W / 2, sy);
        g.lineTo(sx, sy + TILE_H / 2);
        g.lineTo(sx - TILE_W / 2, sy);
        g.closePath();
        g.endFill();
      }
    }
  }

  private sliceFrames(tex: Texture, row: number, count: number): Texture[] {
    return Array.from({ length: count }, (_, col) =>
      new Texture(
        tex.baseTexture,
        new Rectangle(col * DANCER.frameW, row * DANCER.frameH, DANCER.frameW, DANCER.frameH),
      ),
    );
  }
}
