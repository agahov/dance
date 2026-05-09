import { Application } from 'pixi.js';
import { CONFIG } from './config';
import { ArenaExperiment } from './scenes/arena';

const app = new Application({
  width: CONFIG.screen.width,
  height: CONFIG.screen.height,
  ...CONFIG.pixi,
});

document.body.appendChild(app.view as HTMLCanvasElement);

function resize() {
  const scaleX = window.innerWidth / CONFIG.screen.width;
  const scaleY = window.innerHeight / CONFIG.screen.height;
  const scale = Math.min(scaleX, scaleY);
  const canvas = app.view as HTMLCanvasElement;
  canvas.style.width = `${CONFIG.screen.width * scale}px`;
  canvas.style.height = `${CONFIG.screen.height * scale}px`;
}

window.addEventListener('resize', resize);
resize();

const scene = new ArenaExperiment();
scene.init(app).then(() => {
  app.ticker.add((delta) => scene.update(delta));
});
