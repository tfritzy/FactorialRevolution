public class Lumberyard : Building
{
    public override BuildingType Type => BuildingType.Lumberyard;

    public Lumberyard(ulong? id = null) : base(id)
    {
    }
}