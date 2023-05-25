using FluentMigrator.Runner;
using MarketplaceInfrastructure.Migrations;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace MarketplaceInfrastructure.Configurations
{
    public static class MigrationConfiguration
    {
        public static IServiceCollection AddMigrationsConfigurations(this IServiceCollection services)
        {
            services.AddFluentMigratorCore()
                    .ConfigureRunner(conf => conf.AddSqlServer()
                    .WithGlobalConnectionString("DefaultConnection")
                    .ScanIn(typeof(LocationAndCategoryTables_01).Assembly).For.Migrations());

            return services;
        }

        public static void MigrateUpDatabase(this IApplicationBuilder app)
        {
            using var scope = app.ApplicationServices.CreateScope();
            var migrator = scope.ServiceProvider.GetService<IMigrationRunner>();
            migrator.MigrateUp();
        }
    }
}
