interface ImportMeta {
  url: string;
}
interface HTMLCanvasElement {
  transferControlToOffscreen(): OffscreenCanvas;
}

import 'three';

declare module 'three' {
  export interface Raycaster {
    firstHitOnly?: boolean;
  }
}
