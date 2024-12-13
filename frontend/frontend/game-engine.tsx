import * as THREE from "three";
import { Game } from "../src/model/game";
import { TileType } from "../src/map/tile-type";
import { buildBuilding } from "../src/op/build-building";
import { Lumberyard } from "../src/model/lumberyard";
import { V2 } from "../src/numerics/v2";

class GameEngine {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private game: Game;
  private tileObjects: Map<string, THREE.Object3D>;
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;

  private static TILE_COLORS: Record<TileType, THREE.MeshStandardMaterial> = {
    [TileType.Grass]: new THREE.MeshStandardMaterial({ color: "#3c6c54" }),
    [TileType.Water]: new THREE.MeshStandardMaterial({ color: "#3e4c7e" }),
    [TileType.Cliff]: new THREE.MeshStandardMaterial({
      color: "#2e2e43",
      side: THREE.FrontSide,
    }),
    [TileType.Tree]: new THREE.MeshStandardMaterial({ color: "#3c6c54" }),
    [TileType.Iron]: new THREE.MeshStandardMaterial({ color: "#3c6c54" }),
    [TileType.Copper]: new THREE.MeshStandardMaterial({ color: "#3c6c54" }),
  };

  private static TILE_GEOMETRY = new THREE.PlaneGeometry(1, 1);
  private static SIZE = 30;

  constructor(container: HTMLElement) {
    // Initialize core Three.js components
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild(this.renderer.domElement);

    // Initialize game state
    this.game = new Game(GameEngine.SIZE, GameEngine.SIZE);
    this.tileObjects = new Map();

    // Setup raycasting for mouse interaction
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // Initialize scene
    this.setupLights();
    this.createTiles();
    this.setupEventListeners(container);

    // Start the update loop
    this.update();
  }

  private setupLights(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(50, 50, 0);
    directionalLight.castShadow = true;
    directionalLight.shadow.bias = -0.0001;
    directionalLight.shadow.mapSize.width = 4096;
    directionalLight.shadow.mapSize.height = 4096;
    directionalLight.shadow.camera.left = -100;
    directionalLight.shadow.camera.right = 100;
    directionalLight.shadow.camera.top = 100;
    directionalLight.shadow.camera.bottom = -100;
    this.scene.add(directionalLight);
  }

  private createTiles(): void {
    for (let y = 0; y < this.game.map.length; y++) {
      for (let x = 0; x < this.game.map[0].length; x++) {
        const tileType = this.game.map[y][x];
        const tile = new THREE.Mesh(
          GameEngine.TILE_GEOMETRY,
          GameEngine.TILE_COLORS[tileType].clone()
        );

        tile.position.set(x, 0, y);
        tile.rotation.x = -Math.PI / 2;
        tile.receiveShadow = true;
        tile.castShadow = true;
        tile.userData = { x, y, type: tileType };

        this.tileObjects.set(`${x},${y}`, tile);
        this.scene.add(tile);
      }
    }
  }

  private setupEventListeners(container: HTMLElement): void {
    container.addEventListener("mousemove", (event) => {
      this.mouse.x = (event.clientX / container.clientWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / container.clientHeight) * 2 + 1;
    });

    container.addEventListener("click", () => {
      this.handleClick();
    });

    window.addEventListener("resize", () => {
      this.camera.aspect = container.clientWidth / container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(container.clientWidth, container.clientHeight);
    });
  }

  private handleClick(): void {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(
      Array.from(this.tileObjects.values())
    );

    if (intersects.length > 0) {
      const tile = intersects[0].object;
      const { x, y } = tile.userData;

      // Build a lumberyard at the clicked position
      buildBuilding(this.game, new Lumberyard(new V2(x, y)));

      // Example of adding a visual representation of the building
      this.addBuilding(x, y);
    }
  }

  private addBuilding(x: number, y: number): void {
    // Example building mesh - replace with your actual building model
    const buildingGeometry = new THREE.BoxGeometry(0.8, 1, 0.8);
    const buildingMaterial = new THREE.MeshStandardMaterial({
      color: "#8B4513",
    });
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);

    building.position.set(x, 0.5, y); // Positioned slightly above the tile
    building.castShadow = true;
    building.receiveShadow = true;

    this.scene.add(building);
  }

  public removeObject(object: THREE.Object3D): void {
    // this.scene.remove(object);
    // object.geometry?.dispose();
    // if (object.material instanceof THREE.Material) {
    //   object.material.dispose();
    // } else if (Array.isArray(object.material)) {
    //   object.material.forEach((material) => material.dispose());
    // }
  }

  private update(): void {
    requestAnimationFrame(() => this.update());

    // Update game logic here
    // this.game.update();

    // Update visual state based on game state
    this.updateVisuals();

    // Update controls and render
    this.renderer.render(this.scene, this.camera);
  }

  private updateVisuals(): void {
    // Update tile appearances based on game state
    for (let y = 0; y < this.game.map.length; y++) {
      for (let x = 0; x < this.game.map[0].length; x++) {
        const tileType = this.game.map[y][x];
        const tile = this.tileObjects.get(`${x},${y}`);
        if (tile instanceof THREE.Mesh) {
          tile.material = GameEngine.TILE_COLORS[tileType];
        }
      }
    }
  }

  public dispose(): void {
    // Cleanup resources
    this.renderer.dispose();
    this.tileObjects.forEach((object) => {
      this.removeObject(object);
    });
    this.tileObjects.clear();
  }
}

// Usage:
export function initializeGame(container: HTMLElement): GameEngine {
  return new GameEngine(container);
}
