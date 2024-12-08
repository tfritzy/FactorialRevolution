namespace FactorialRevolution.game;

public class Game
{
    public ulong?[,] Bulidings;
    public Dictionary<ulong, Entity> Entities = new();

    public Game(GameSettings settings)
    {
        Bulidings = new ulong?[settings.Height, settings.Width];
    }
}
