import { ItemType } from "../src/item/item-type";
import { TileType } from "../src/map/tile-type";
import * as THREE from "three";

export class MaterialCache {
  private static instance: MaterialCache;
  private tileMaterials: Map<TileType, THREE.Material>;
  private entityMaterials: Map<string, THREE.Material>;
  private itemMaterials: Map<ItemType, THREE.Material>;

  private constructor() {
    this.tileMaterials = new Map();
    this.itemMaterials = new Map();
    this.entityMaterials = new Map();
  }

  public static getInstance(): MaterialCache {
    if (!MaterialCache.instance) {
      MaterialCache.instance = new MaterialCache();
    }
    return MaterialCache.instance;
  }

  public getTileMaterial(type: TileType): THREE.Material {
    let material = this.tileMaterials.get(type);

    if (!material) {
      const texture = this.loadTexture("/tile/" + type);
      material = new THREE.MeshStandardMaterial({
        map: texture,
      });
      this.tileMaterials.set(type, material);
    }

    return material;
  }

  public getEntityMaterial(type: string): THREE.Material {
    let material = this.entityMaterials.get(type);

    if (!material) {
      const texture = this.loadTexture("/entity/" + type);
      material = new THREE.MeshStandardMaterial({
        map: texture,
        alphaTest: 0.5,
      });
      this.entityMaterials.set(type, material);
    }

    return material;
  }

  public getItemMaterial(type: ItemType): THREE.Material {
    let material = this.itemMaterials.get(type);

    if (!material) {
      const texture = this.loadTexture("/item/" + type);
      material = new THREE.MeshStandardMaterial({
        map: texture,
        alphaTest: 0.5,
      });
      this.itemMaterials.set(type, material);
    }

    return material;
  }

  private loadTexture(type: string): THREE.Texture {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(`${type}.png`);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    return texture;
  }

  public dispose(): void {
    this.tileMaterials.forEach((material) => material.dispose());
    this.itemMaterials.forEach((material) => material.dispose());

    this.tileMaterials.clear();
    this.itemMaterials.clear();
  }
}
