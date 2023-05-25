using FluentMigrator;

namespace MarketplaceInfrastructure.Migrations
{
    [Migration(202304241555)]
    public class LocationAndCategoryTables_01 : Migration
    {
        public override void Up()
        {
            Create.Table("Locations")
                .WithColumn("Id").AsInt32().PrimaryKey().Identity()
                .WithColumn("City").AsString(100).NotNullable();

            Create.Table("Categories")
                .WithColumn("Id").AsInt32().PrimaryKey().Identity()
                .WithColumn("Type").AsString(200).NotNullable();

            Insert.IntoTable("Locations").Row(new { City = "Plovdiv" });
            Insert.IntoTable("Locations").Row(new { City = "Veliko Tarnovo" });
            Insert.IntoTable("Locations").Row(new { City = "Home Office" });

            Insert.IntoTable("Categories").Row(new { Type = "Laptop" });
            Insert.IntoTable("Categories").Row(new { Type = "Monitor" });
            Insert.IntoTable("Categories").Row(new { Type = "PC" });
            Insert.IntoTable("Categories").Row(new { Type = "Mouse" });
            Insert.IntoTable("Categories").Row(new { Type = "Keyboard" });
        }

        public override void Down()
        {
            Delete.Table("Locations");
            Delete.Table("Categories");
        }
    }
}
