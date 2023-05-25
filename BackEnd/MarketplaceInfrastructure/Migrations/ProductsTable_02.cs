using FluentMigrator;

namespace MarketplaceInfrastructure.Migrations
{
    [Migration(202304241620)]
    public class ProductsTable_02 : Migration
    {
        public override void Up()
        {
            Create.Table("Products")
                .WithColumn("Id").AsInt32().PrimaryKey().Identity()
                .WithColumn("Code").AsString(100).NotNullable()
                .WithColumn("FullName").AsString(100).NotNullable()
                .WithColumn("Price").AsDecimal(10, 2).NotNullable()
                .WithColumn("Quantity").AsInt32().NotNullable()
                .WithColumn("QuantityForSale").AsInt32().NotNullable().WithDefaultValue(0)
                .WithColumn("Description").AsString(1000).Nullable()
                .WithColumn("LocationId").AsInt32().Nullable().ForeignKey("Locations", "Id")
                .WithColumn("CategoryId").AsInt32().NotNullable().ForeignKey("Categories", "Id");
        }

        public override void Down()
        {
            Delete.Table("Products");
        }
    }
}
