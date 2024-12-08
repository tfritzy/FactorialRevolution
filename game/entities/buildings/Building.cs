public abstract class Building : Entity
{
    public abstract BuildingType Type { get; }

    public Building(ulong? id = null) : base(id)
    {
    }
}