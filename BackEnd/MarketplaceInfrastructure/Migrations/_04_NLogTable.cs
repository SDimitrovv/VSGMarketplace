using FluentMigrator;

namespace MarketplaceInfrastructure.Migrations
{
    [Migration(202304251350)]
    public class _04_NLogTable : Migration
    {
        public override void Up()
        {
            Create.Table("NLog")
                .WithColumn("Date").AsDateTime().NotNullable()
                .WithColumn("Level").AsString(1024).Nullable()
                .WithColumn("[Message]").AsString(1024).Nullable();
        }

        public override void Down()
        {
            Delete.Table("NLog");
        }
    }
}
