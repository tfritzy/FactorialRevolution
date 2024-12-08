using FactorialRevolution.game;

public static class Construction
{
    public static void PlaceBuilding(Game game, Building building, int x, int y)
    {
        game.Entities.Add(building.Id, building);
        game.Bulidings[y, x] = building.Id;
    }
}