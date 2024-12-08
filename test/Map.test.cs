[TestClass]
public class MapTests
{
    [TestMethod]
    public void MapTests_Generate()
    {
        TileType[,] map = GenerateMap.Generate(10, 4);

        Assert.AreEqual(map.GetLength(0), 4);
        Assert.AreEqual(map.GetLength(1), 10);
    }
}