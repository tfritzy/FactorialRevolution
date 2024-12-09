import React, { useState, useMemo, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { Card, CardContent } from "./card";
import { Game } from "./game/game";
import * as THREE from "three";
import { TileType } from "./map/tile-type";

const TILE_COLORS: Record<TileType, THREE.MeshStandardMaterial> = {
  [TileType.Grass]: new THREE.MeshStandardMaterial({ color: "#3c6c54" }),
  [TileType.Water]: new THREE.MeshStandardMaterial({ color: "#3e4c7e" }),
  [TileType.Cliff]: new THREE.MeshStandardMaterial({
    color: "#2e2e43",
    side: THREE.FrontSide,
  }),
};

const flatGeo = new THREE.PlaneGeometry(1, 1);
const cliffGeo = new THREE.BoxGeometry(1, 1, 1);

const TILE_GEOMETRY: Record<TileType, THREE.BufferGeometry> = {
  [TileType.Grass]: flatGeo,
  [TileType.Water]: flatGeo,
  [TileType.Cliff]: cliffGeo,
};

const TileMap: React.FC = () => {
  const [selectedTile, setSelectedTile] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const game = useMemo(() => new Game(100, 100), []);

  const handleClick = useCallback(
    (x: number, y: number) => (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      setSelectedTile({ x, y });
    },
    []
  );

  const tiles = useMemo(() => {
    const tiles = [];
    for (let y = 0; y < game.map.length; y++) {
      for (let x = 0; x < game.map[0].length; x++) {
        const tileType = game.map[y][x];
        tiles.push(
          <mesh
            key={`${x}-${y}`}
            position={[x, tileType === TileType.Cliff ? 0.5 : 0, y]}
            geometry={TILE_GEOMETRY[tileType]}
            material={TILE_COLORS[tileType]}
            onClick={handleClick(x, y)}
            receiveShadow
            castShadow
            rotation={new THREE.Euler(-Math.PI / 2, 0, 0)}
          />
        );
      }
    }
    return tiles;
  }, [game.map, handleClick]);

  return (
    <div className="relative w-full h-full">
      <Canvas
        shadows={{ type: THREE.PCFShadowMap, enabled: true }}
        camera={{ position: [100, 50, 100], fov: 75 }}
      >
        <ambientLight intensity={1} />
        <directionalLight
          position={[50, 50, 0]}
          intensity={1.5}
          castShadow
          shadow-bias={-0.0001}
          shadow-mapSize-width={4096}
          shadow-mapSize-height={4096}
          shadow-camera-left={-100}
          shadow-camera-right={100}
          shadow-camera-top={100}
          shadow-camera-bottom={-100}
        />
        {tiles}
        <OrbitControls target={[50, 0, 50]} />
      </Canvas>
      {selectedTile && (
        <div className="absolute top-8 right-8 z-10">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-bold mb-2">Selected Tile</h3>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TileMap;
