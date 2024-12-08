
using FactorialRevolution.game;

[TestClass]
public class ConstructionTests
{
    [TestMethod]
    public void Construction_PlaceBuilding_UpdatesGame()
    {
        Game game = new Game(TH.GetSettings());
        var lumberyard = new Lumberyard();

        Construction.PlaceBuilding(game, lumberyard, 1, 3);

        Assert.AreEqual(game.Bulidings[3, 1], lumberyard.Id);
        Assert.AreEqual(lumberyard, game.Entities[lumberyard.Id]);
    }
}