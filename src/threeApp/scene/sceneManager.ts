import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'stats.js';
import { ContextSingleton } from '@/core/ContextSingleton';

import { CameraManager } from '@/threeApp/scene/cameraManager';
import { EffectsManager } from '@/threeApp/scene/effectsManager';
import { ApiThreeToUi } from '@/api/apiLocal/apiThreeToUi';

export class SceneManager extends ContextSingleton<SceneManager> {
  stats = null;
  canvas: HTMLCanvasElement | OffscreenCanvas;
  container: { width: number; height: number; left: number; top: number; dpr: number; virtDom: boolean };
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  cameraManager: CameraManager;

  public async init({ canvas, container }) {
    this.canvas = canvas;
    this.container = container;

    this.initStats();
    this.initScene();
    this.initRenderer();
    this.initCamera();
    this.initControls();
    this.initLights();
    this.initHelpers();

    this.render();
  }

  public setSizeContainer({ width, height, left, top }: { width: number; height: number; left: number; top: number }) {
    this.container.left = left;
    this.container.top = top;
    this.container.width = width;
    this.container.height = height;
  }

  public getClientRect() {
    return { left: this.container.left, top: this.container.top, width: this.container.width, height: this.container.height };
  }

  private initStats() {
    this.stats = new Stats();
    this.stats.showPanel(0);

    document.getElementById('stats').appendChild(this.stats.domElement);
    this.stats.domElement.style.left = 'auto';
    this.stats.domElement.style.right = '0';
  }

  private initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = 3;
    this.scene.add(cube);
  }

  private initCamera() {
    this.cameraManager = new CameraManager();
    this.cameraManager.init({ renderer: this.renderer });
    this.camera = this.cameraManager.getActiveCamera();
  }

  private initRenderer() {
    const rect = this.getClientRect();

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, stencil: true });
    this.renderer.setSize(rect.width, rect.height, false);
    this.renderer.shadowMap.enabled = true;
    this.renderer.localClippingEnabled = true;
  }

  private initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.controls.addEventListener('start', () => this.render());
    this.controls.addEventListener('change', () => this.render());
    this.controls.addEventListener('end', () => this.render());
    console.log(777);
  }

  private initLights() {
    const ambientLight = new THREE.AmbientLight(0x404040);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight2.position.set(-1, 1, -1);
    directionalLight2.castShadow = true;
    this.scene.add(directionalLight2);
  }

  private initHelpers() {
    const gridHelper = new THREE.GridHelper(10, 10);
    this.scene.add(gridHelper);
  }

  public render() {
    if (!this.renderer) return;
    if (this.stats) this.stats.begin();

    console.log('render');

    //if (ClippingBvh.inst()) ClippingBvh.inst().performClipping();
    if (EffectsManager.inst() && EffectsManager.inst().enabled) {
      const renderCalls = EffectsManager.inst().render();

      //ApiThreeToUi.updateDrawCalls(renderCalls);
    } else {
      const camera = this.cameraManager.getActiveCamera();
      this.renderer.render(this.scene, camera);

      //ApiThreeToUi.updateDrawCalls(this.renderer.info.render.calls);
    }

    if (this.stats) this.stats.end();
  }
}
