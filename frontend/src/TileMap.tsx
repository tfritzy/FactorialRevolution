import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { Card, CardContent } from "./card";

interface TileProps {
  position: [number, number, number];
  onClick: (event: ThreeEvent<MouseEvent>) => void;
  color: string;
}

interface TileData {
  position: [number, number, number];
  color: string;
  id: string;
  type: number;
}

const Tile: React.FC<TileProps> = ({ position, onClick, color }) => {
  return (
    <mesh position={position} onClick={onClick}>
      <boxGeometry args={[1, 0.1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
const colors: string[] = ["#4e9363", "#495f94", "#f5c47c"];

const TileMap: React.FC = () => {
  const [selectedTile, setSelectedTile] = useState<TileData | null>(null);

  const tiles = React.useMemo(() => {
    const tiles: TileData[] = [];
    for (let x = -2; x <= 2; x++) {
      for (let z = -2; z <= 2; z++) {
        tiles.push({
          position: [x, 0, z],
          color: colors[Math.floor(Math.random() * colors.length)],
          id: `tile-${x}-${z}`,
          type: Math.floor(Math.random() * 3),
        });
      }
    }
    return tiles;
  }, [colors]);

  return (
    <div className="relative w-full h-full">
      <Canvas camera={{ position: [5, 5, 5], fov: 75 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={0.5} />

        {tiles.map((tile) => (
          <Tile
            key={tile.id}
            position={tile.position}
            color={tile.color}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedTile(tile);
            }}
          />
        ))}

        <OrbitControls />
      </Canvas>

      {selectedTile && (
        <div className="absolute top-8 right-8 z-10">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-bold mb-2">Selected Tile</h3>
              <p>ID: {selectedTile.id}</p>
              <p>Type: {selectedTile.type}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TileMap;
