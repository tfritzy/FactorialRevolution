public static class IdGenerator
{
    static ulong id = 1;
    public static ulong GetId()
    {
        id += 1;
        return id;
    }
}