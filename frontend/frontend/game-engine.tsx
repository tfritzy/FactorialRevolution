import * as THREE from "three";
import { Game } from "../src/model/game";
import { TileType } from "../src/map/tile-type";
import { buildBuilding } from "../src/op/build-building";
import { Conveyor } from "../src/model/conveyor";
import { V2 } from "../src/numerics/v2";
import { getBuilding } from "../src/op/get-building";
import { Building } from "../src/model/building";

class GameEngine {
  private scene: THREE.Scene;
  private camera: THREE.OrthographicCamera;
  private renderer: THREE.WebGLRenderer;
  private game: Game;
  private tileObjects: Map<string, THREE.Object3D>;
  private buildingObjects: Map<string, THREE.Object3D>;
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  private container: HTMLElement;

  private static TILE_GEOMETRY = new THREE.PlaneGeometry(1, 1);
  private static SIZE = 50;

  constructor(container: HTMLElement) {
    this.container = container;

    // Initialize core Three.js components
    this.scene = new THREE.Scene();
    const zoom = 0.05;
    this.camera = new THREE.OrthographicCamera(
      (container.clientWidth / -2) * zoom,
      (container.clientWidth / 2) * zoom,
      (container.clientHeight / 2) * zoom,
      (container.clientHeight / -2) * zoom,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setClearColor("#1c1917");
    container.appendChild(this.renderer.domElement);

    // Initialize mouse and raycaster
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();

    // Set initial camera position
    this.camera.position.set(
      GameEngine.SIZE / 2,
      GameEngine.SIZE,
      GameEngine.SIZE / 2
    );
    this.camera.lookAt(GameEngine.SIZE / 2, 0, GameEngine.SIZE / 2);

    // Initialize game state
    this.game = new Game(GameEngine.SIZE, GameEngine.SIZE);
    this.tileObjects = new Map();
    this.buildingObjects = new Map();

    // Initialize scene
    this.setupLights();
    this.createTiles();
    this.setupEventListeners();

    // Start the update loop
    this.update();
  }

  private setupLights(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(50, 50, 0);
    this.scene.add(directionalLight);
  }

  private createTiles(): void {
    const tilesGroup = new THREE.Group();
    const textureLoader = new THREE.TextureLoader();
    const tile_materials: Map<TileType, THREE.Material> = new Map();

    Object.values(TileType)
      .filter((key) => isNaN(Number(key))) // Keep only the string names
      .forEach((tileName) => {
        const texture = textureLoader.load(`/${tileName}.png`);
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;

        const mat = new THREE.MeshStandardMaterial({
          map: texture,
        });
        tile_materials.set(tileName, mat);
      });

    console.log(tile_materials);

    for (let y = 0; y < this.game.map.length; y++) {
      for (let x = 0; x < this.game.map[0].length; x++) {
        const tileType = this.game.map[y][x];
        const tile = new THREE.Mesh(
          GameEngine.TILE_GEOMETRY,
          tile_materials.get(tileType)?.clone()
        );

        tile.position.set(x, 0, y);
        tile.rotation.x = -Math.PI / 2;
        tile.userData = { x, y, type: tileType };

        // Enable raycasting for this tile
        tile.raycast = THREE.Mesh.prototype.raycast;

        this.tileObjects.set(`${x},${y}`, tile);
        tilesGroup.add(tile);
      }
    }

    this.scene.add(tilesGroup);
  }

  private setupEventListeners(): void {
    // Get bounding rectangle once and store it
    const updateMousePosition = (event: MouseEvent) => {
      const rect = this.container.getBoundingClientRect();
      this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    this.container.addEventListener("mousemove", updateMousePosition);
    this.container.addEventListener("click", (event) => {
      updateMousePosition(event);
      this.handleClick(event);
    });
  }

  private handleClick(event: MouseEvent): void {
    this.raycaster.setFromCamera(
      new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      ),
      this.camera
    );
    const intersects = this.raycaster.intersectObjects(
      this.scene.children,
      true
    );

    if (intersects.length > 0) {
      const tile = intersects[0].object;
      const { x, y } = tile.userData;

      buildBuilding(this.game, new Conveyor(new V2(x, y)));
    }
  }

  private addBuilding(building: Building): void {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(`/${building.type}.png`);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    const buildingGeometry = new THREE.BoxGeometry(0.8, 1, 0.8);
    const buildingMaterial = new THREE.MeshStandardMaterial({
      map: texture,
    });
    const mesh = new THREE.Mesh(buildingGeometry, buildingMaterial);

    mesh.position.set(building.pos.x, 0.5, building.pos.y);
    this.scene.add(mesh);
    this.buildingObjects.set(building.id, mesh);
  }

  private update(): void {
    requestAnimationFrame(() => this.update());
    this.updateVisuals();
    this.renderer.render(this.scene, this.camera);
  }

  private updateVisuals(): void {
    for (let y = 0; y < this.game.map.length; y++) {
      for (let x = 0; x < this.game.map[0].length; x++) {
        const building = getBuilding(this.game, y, x);
        if (building && !this.buildingObjects.has(building.id)) {
          this.addBuilding(building);
        }
      }
    }
  }

  public dispose(): void {
    this.renderer.dispose();
    this.tileObjects.forEach((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        if (object.material instanceof THREE.Material) {
          object.material.dispose();
        }
      }
    });
    this.tileObjects.clear();
  }
}

export function initializeGame(container: HTMLElement): GameEngine {
  return new GameEngine(container);
}
