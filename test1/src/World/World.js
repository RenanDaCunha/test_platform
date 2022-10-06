import { loadBirds } from 'https://cdn.jsdelivr.net/gh/RenanDaCunha/test_platform/test1/src/World/components/birds/birds.js';
import { createCamera } from 'https://cdn.jsdelivr.net/gh/RenanDaCunha/test_platform/test1/src/World/components/camera.js';
import { createLights } from 'https://cdn.jsdelivr.net/gh/RenanDaCunha/test_platform/test1/src/World/components/lights.js';
import { createScene } from 'https://cdn.jsdelivr.net/gh/RenanDaCunha/test_platform/test1/src/World/components/scene.js';

import { createControls } from 'https://cdn.jsdelivr.net/gh/RenanDaCunha/test_platform/test1/src/World/systems/controls.js';
import { createRenderer } from 'https://cdn.jsdelivr.net/gh/RenanDaCunha/test_platform/test1/src/World/systems/renderer.js';
import { Resizer } from 'https://cdn.jsdelivr.net/gh/RenanDaCunha/test_platform/test1/src/World/systems/Resizer.js';
import { Loop } from 'https://cdn.jsdelivr.net/gh/RenanDaCunha/test_platform/test1/src/World/systems/Loop.js';

let camera;
let controls;
let renderer;
let scene;
let loop;

class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);
    controls = createControls(camera, renderer.domElement);

    const { ambientLight, mainLight } = createLights();

    loop.updatables.push(controls);
    scene.add(ambientLight, mainLight);

    const resizer = new Resizer(container, camera, renderer);
  }

  async init() {
    const { parrot, flamingo, stork } = await loadBirds();

    // move the target to the center of the front bird
    controls.target.copy(parrot.position);

    loop.updatables.push(parrot, flamingo, stork);
    scene.add(parrot, flamingo, stork);
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
