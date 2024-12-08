using System.Runtime.CompilerServices;

namespace FactorialRevolution.game;

public class Game
{
    public ulong?[,] Bulidings;
    public TileType[,] Map;
    public Dictionary<ulong, Entity> Entities = new();

    public Game(GameSettings settings)
    {
        Bulidings = new ulong?[settings.Height, settings.Width];
        Map = GenerateMap.Generate(settings.Width, settings.Height);
    }
}
