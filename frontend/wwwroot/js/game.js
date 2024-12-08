let scene, camera, renderer, raycaster, mouse;
const tiles = new Map();
let dotNetReference = null;
const textureLoader = new THREE.TextureLoader();

window.initializeGame = function (tileData, dotNetRef) {
  dotNetReference = dotNetRef;
  const canvas = document.getElementById("gameCanvas");
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  if (canvas) {
    canvas.appendChild(renderer.domElement);
  } else {
    document.body.appendChild(renderer.domElement);
  }

  scene.background = new THREE.Color(0x2194ce);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 10, 10);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x404040));

  const grass = textureLoader.load("tiles/lumberyard.png");
  grass.magFilter = THREE.NearestFilter;
  grass.minFilter = THREE.NearestFilter;
  const geometry = new THREE.PlaneGeometry(1, 1);
  const grassMat = new THREE.MeshStandardMaterial({
    map: grass,
    color: 0xffffff,
    transparent: true,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, grassMat);
  mesh.position.set(5, 0, 5);
  mesh.rotation.x = -Math.PI / 2;
  scene.add(mesh);

  if (tileData && Array.isArray(tileData)) {
    tileData.forEach((tile) => {
      const geometry = new THREE.PlaneGeometry(1, 1);
      const material = new THREE.MeshStandardMaterial({
        color: tile.isInteractive ? 0x00ff00 : 0x808080,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(tile.x - 5, 0, tile.y - 5);
      mesh.rotation.x = -Math.PI / 2;
      scene.add(mesh);
      tiles.set(`${tile.x},${tile.y}`, mesh);
    });
  }

  camera.position.set(0, 10, 0);
  camera.lookAt(0, 0, 0);
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  renderer.domElement.addEventListener("click", onMouseClick, false);
  animate();
};

function animate() {
  requestAnimationFrame(animate);
  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

function onMouseClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    const tileX = Math.round(clickedObject.position.x + 5);
    const tileY = Math.round(clickedObject.position.z + 5);
    dotNetReference.invokeMethodAsync("HandleTileClick", tileX, tileY);
  }
}

document.addEventListener("mousedown", (event) => {
  const uiElement = document.getElementById("tile-ui");
  if (
    uiElement &&
    !uiElement.contains(event.target) &&
    event.target.id !== "gameCanvas"
  ) {
    dotNetReference.invokeMethodAsync("CloseTileUI");
  }
});

window.addEventListener("resize", () => {
  if (camera && renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
});
