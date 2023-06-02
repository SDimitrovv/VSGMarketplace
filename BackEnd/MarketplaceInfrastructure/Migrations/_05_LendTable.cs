using FluentMigrator;

namespace MarketplaceInfrastructure.Migrations
{
    [Migration(202306021506)]
    public class _05_LendTable : Migration
    {
        public override void Up()
        {
            Create.Table("Lends")
                .WithColumn("Id").AsInt32().PrimaryKey().Identity()
                .WithColumn("StartDate").AsString(100).NotNullable()
                .WithColumn("EndDate").AsString(100).Nullable()
                .WithColumn("Quantity").AsInt32().NotNullable()
                .WithColumn("ProductId").AsInt32().NotNullable()
                .WithColumn("Email").AsString(255).NotNullable()
                .WithColumn("ProductCode").AsString(100).NotNullable()
                .WithColumn("ProductFullName").AsString(100).NotNullable();
        }

        public override void Down()
        {
            Delete.Table("Lends");
        }
    }
}
