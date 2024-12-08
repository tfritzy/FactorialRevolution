public static class GenerateMap
{
    public static TileType[,] Generate(int width, int height)
    {
        TileType[,] map = new TileType[height, width];
        for (int y = 0; y < height; y++)
        {
            for (int x = 0; x < width; x++)
            {
                map[y, x] = TileType.Grass;
            }
        }

        return map;
    }
}