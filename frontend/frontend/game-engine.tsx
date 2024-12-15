import * as THREE from "three";
import { Game } from "../src/model/game";
import { getBuilding } from "../src/op/get-building";
import { Building } from "../src/model/building";
import { createRoot } from "react-dom/client";
import { isHarvestable, playerHarvest } from "../src/op/player-harvest";
import { buildHeldBuilding } from "../src/op/build-building";
import GameOverlay from "./game-overlay";
import React from "react";
import { MaterialCache } from "./material-cache";
import { V2 } from "../src/numerics/v2";
import { ItemIcon } from "./item-icon";

class GameEngine {
  private scene: THREE.Scene;
  private camera: THREE.OrthographicCamera;
  private renderer: THREE.WebGLRenderer;
  private game: Game;
  private tileObjects: Map<string, THREE.Object3D>;
  private buildingObjects: Map<string, THREE.Object3D>;
  private raycaster: THREE.Raycaster;
  private container: HTMLElement;
  private uiContainer: HTMLElement;
  private reactRoot: ReturnType<typeof createRoot>;
  private materialCache: MaterialCache;
  private harvesting: { pos: V2; remaining: number } | undefined;
  private mousePosition: V2 = new V2(0, 0);
  private heldItem: HTMLElement | undefined;
  private heldItemRoot: ReturnType<typeof createRoot> | undefined;

  private static TILE_GEOMETRY = new THREE.PlaneGeometry(1, 1);
  private static SIZE = 100;

  constructor(container: HTMLElement) {
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
    this.camera.position.set(
      GameEngine.SIZE / 2,
      GameEngine.SIZE,
      GameEngine.SIZE / 2
    );
    this.camera.lookAt(GameEngine.SIZE / 2, 0, GameEngine.SIZE / 2);
    this.game = new Game(GameEngine.SIZE, GameEngine.SIZE);
    this.tileObjects = new Map();
    this.buildingObjects = new Map();
    this.materialCache = MaterialCache.getInstance();

    // Create UI container
    this.uiContainer = document.createElement("div");
    this.uiContainer.style.position = "absolute";
    this.uiContainer.style.top = "0";
    this.uiContainer.style.left = "0";
    this.uiContainer.style.width = "100%";
    this.uiContainer.style.height = "100%";
    container.style.position = "relative";
    container.appendChild(this.uiContainer);

    // Initialize React root
    this.reactRoot = createRoot(this.uiContainer);
    this.updateOverlay();

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

  private updateOverlay(): void {
    this.reactRoot.render(<GameOverlay game={this.game} />);
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

    this.container.addEventListener("mousemove", (event) => {
      this.mousePosition.x = event.clientX;
      this.mousePosition.y = event.clientY;
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
      } else if (isHarvestable(this.game, y, x)) {
        this.harvesting = {
          pos: new V2(x, y),
          remaining: 1,
        };
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

    this.renderHeldItem();
  }

  private renderHeldItem(): void {
    if (this.game.heldItem && !this.heldItem) {
      this.heldItem = document.createElement("div");
      this.heldItem.className = "absolute";
      this.heldItem.style.pointerEvents = "none";
      this.heldItemRoot = createRoot(this.heldItem);
      this.heldItemRoot.render(
        <ItemIcon
          item={this.game.heldItem.type}
          quantity={this.game.heldItem.quantity}
        />
      );
      this.uiContainer.appendChild(this.heldItem);
    }

    if (!this.game.heldItem && this.heldItem) {
      this.heldItemRoot?.unmount();
      this.uiContainer.removeChild(this.heldItem);
      this.heldItem = undefined;
      this.heldItemRoot = undefined;
    }

    if (this.heldItem) {
      this.heldItem.style.left = `${this.mousePosition.x}px`;
      this.heldItem.style.top = `${this.mousePosition.y}px`;
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
