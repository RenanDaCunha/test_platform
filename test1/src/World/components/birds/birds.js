import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136.2/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from 'https://cdn.jsdelivr.net/gh/RenanDaCunha/test_platform/test1/src/World/components/birds/setupModel.js';

async function loadBirds() {
  const loader = new GLTFLoader();

  const [parrotData, flamingoData, storkData] = await Promise.all([
    loader.loadAsync('https://cdn.jsdelivr.net/gh/RenanDaCunha/test_platform//Parrot.glb'),
    loader.loadAsync('https://cdn.jsdelivr.net/gh/RenanDaCunha/test_platform//Flamingo.glb'),
    loader.loadAsync('https://cdn.jsdelivr.net/gh/RenanDaCunha/test_platform//Stork.glb'),
  ]);

  console.log('Squaaawk!', parrotData);

  const parrot = setupModel(parrotData);
  parrot.position.set(0, 0, 2.5);

  const flamingo = setupModel(flamingoData);
  flamingo.position.set(7.5, 0, -10);

  const stork = setupModel(storkData);
  stork.position.set(0, -2.5, -10);

  return {
    parrot,
    flamingo,
    stork,
  };
}

export { loadBirds };
