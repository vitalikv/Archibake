import { SceneManager } from '@/threeApp/scene/sceneManager';

export class ThreeApp {
  public isRenderWorker = true;

  async init() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    canvas.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    const containerRect = canvas.getBoundingClientRect();
    const containerParams = {
      width: containerRect.width,
      height: containerRect.height,
      left: containerRect.left,
      top: containerRect.top,
      dpr: window.devicePixelRatio,
      virtDom: true,
    };

    await SceneManager.inst().init({ canvas, container: containerParams });

    const resizeHandler = () => {
      const rect = canvas.getBoundingClientRect();
      SceneManager.inst().setSizeContainer({ width: rect.width, height: rect.height, left: rect.left, top: rect.top });
      SceneManager.inst().cameraManager.resize();
    };
    const resizeObserver = new ResizeObserver(resizeHandler);
    resizeObserver.observe(canvas);
  }
}
