import * as THREE from "three";
import { Game } from "../src/model/game";
import { getBuilding } from "../src/op/get-building";
import { Building } from "../src/model/building";
import { isHarvestable, playerHarvest } from "../src/op/player-harvest";
import { buildHeldBuilding } from "../src/op/build-building";
import { MaterialCache } from "./material-cache";
import { V2 } from "../src/numerics/v2";
import { Dispatch } from "@reduxjs/toolkit";
import { openInspector, setHeldItem } from "./redux/store";

class GameEngine {
  private scene: THREE.Scene;
  private camera: THREE.OrthographicCamera;
  private renderer: THREE.WebGLRenderer;
  private game: Game;
  private tileObjects: Map<string, THREE.Object3D>;
  private buildingObjects: Map<string, THREE.Object3D>;
  private raycaster: THREE.Raycaster;
  private container: HTMLElement;
  private materialCache: MaterialCache;
  private harvesting: { pos: V2; remaining: number } | undefined;
  private dispatch: Dispatch;

  private static TILE_GEOMETRY = new THREE.PlaneGeometry(1, 1);

  constructor(container: HTMLElement, game: Game, dispatch: Dispatch) {
    this.dispatch = dispatch;
    this.container = container;
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
    this.raycaster = new THREE.Raycaster();
    const size = game.map.length;
    this.camera.position.set(size / 2, size, size / 2);
    this.camera.lookAt(size / 2, 0, size / 2);
    this.game = game;
    this.tileObjects = new Map();
    this.buildingObjects = new Map();
    this.materialCache = MaterialCache.getInstance();

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

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(50, 50, 0);
    this.scene.add(directionalLight);
  }

  private createTiles(): void {
    const tilesGroup = new THREE.Group();

    for (let y = 0; y < this.game.map.length; y++) {
      for (let x = 0; x < this.game.map[0].length; x++) {
        const tileType = this.game.map[y][x];
        const tile = new THREE.Mesh(
          GameEngine.TILE_GEOMETRY,
          this.materialCache.getTileMaterial(tileType)
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
    this.container.addEventListener("click", (event) => {
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

      if (this.game.heldItem) {
        buildHeldBuilding(this.game, y, x, V2.right());
        this.dispatch(setHeldItem(this.game.heldItem));
      } else if (isHarvestable(this.game, y, x)) {
        this.harvesting = {
          pos: new V2(x, y),
          remaining: 1,
        };
      } else if (this.game.buildings[y][x]) {
        this.dispatch(openInspector(new V2(x, y)));
      }
    }
  }

  private addBuilding(building: Building): void {
    const mat = this.materialCache.getEntityMaterial(building.type);
    const buildingGeometry = new THREE.BoxGeometry(0.8, 1, 0.8);
    const mesh = new THREE.Mesh(buildingGeometry, mat);

    mesh.position.set(building.pos.x, 0.5, building.pos.y);
    this.scene.add(mesh);
    this.buildingObjects.set(building.id, mesh);
  }

  private lastTime: number = performance.now();
  private update(): void {
    const currentTime = performance.now();
    const deltaTime_s = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    this.harvest(deltaTime_s);
    this.game.tick(deltaTime_s);
    requestAnimationFrame(() => this.update());
    this.updateVisuals();
    this.renderer.render(this.scene, this.camera);
  }

  private harvest(deltaTime_s): void {
    if (this.harvesting) {
      this.harvesting.remaining -= deltaTime_s;
      if (this.harvesting.remaining <= 0) {
        playerHarvest(this.game, this.harvesting.pos.y, this.harvesting.pos.x);
        this.harvesting = undefined;
      }
    }
  }

  private updateVisuals(): void {
    // slower than should be.
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

export function initializeGame(
  container: HTMLElement,
  game: Game,
  dispatch: Dispatch
): GameEngine {
  return new GameEngine(container, game, dispatch);
}
