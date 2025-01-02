import { Game } from "../../src/model/game";
import { useEffect, useState } from "react";

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function WaveIndicator({ game }: { game: Game }) {
  const [time, setTime] = useState<string>("");
  const portal = game.enemyPortal;

  // Force a re-render every frame to update the timer
  useEffect(() => {
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      setTime(formatTime(portal!.waveCooldown));
    };

    let animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!portal) {
    return null;
  }

  const currentWave = portal.wave;
  const upcomingWaves = portal.waves.slice(currentWave, currentWave + 3);

  return (
    <div className="fixed top-4 right-4 bg-gray-800 bg-opacity-90 text-white p-4 rounded-lg shadow-lg">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Wave {currentWave + 1}</h2>
        <div className="text-2xl font-mono">
          Next wave in: {formatTime(portal.waveCooldown)}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Upcoming Waves:</h3>
        <div className="space-y-2">
          {upcomingWaves.map((wave, index) => (
            <div key={wave.index} className="flex items-center gap-2 text-sm">
              <span className="font-mono">Wave {wave.index}:</span>
              <span className="px-2 py-1 bg-gray-700 rounded">
                {wave.quantity}× {wave.type}
              </span>
              <span className="text-gray-300">({wave.name})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
