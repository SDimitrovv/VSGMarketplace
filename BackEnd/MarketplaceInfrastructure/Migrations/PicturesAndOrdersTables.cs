using FluentMigrator; 

namespace MarketplaceInfrastructure.Migrations
{
    [Migration(202304241647)]
    public class PicturesAndOrdersTables : Migration
    {
        public override void Up()
        {
            Create.Table("Pictures")
                .WithColumn("Id").AsInt32().PrimaryKey().Identity()
                .WithColumn("ImageUrl").AsString(1000).NotNullable()
                .WithColumn("ImagePublicId").AsString(1000).NotNullable()
                .WithColumn("ProductId").AsInt32().NotNullable().ForeignKey("Products", "Id");

            Create.Table("Orders")
                .WithColumn("Id").AsInt32().PrimaryKey().Identity()
                .WithColumn("Quantity").AsInt32().NotNullable()
                .WithColumn("Date").AsString(100).NotNullable()
                .WithColumn("Status").AsString(10).NotNullable()
                .WithColumn("ProductId").AsInt32().NotNullable().ForeignKey("Products", "Id")
                .WithColumn("Email").AsString(255).NotNullable();
        }

        public override void Down()
        {
            Delete.Table("Pictures");
            Delete.Table("Orders");
        }
    }
}
