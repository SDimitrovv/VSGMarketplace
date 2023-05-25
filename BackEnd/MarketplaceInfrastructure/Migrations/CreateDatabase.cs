using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace MarketplaceInfrastructure.Migrations
{
    public static class CreateDatabase
    {
        public static void Create(IConfiguration configuration)
        {
            var connectionString = new SqlConnectionStringBuilder(configuration.GetConnectionString("DefaultConnection"));
            var name = connectionString.InitialCatalog;

            using var connection = new SqlConnection(configuration.GetConnectionString("MigrationString"));
            var databaseExists = connection.QueryFirstOrDefault<int>("SELECT COUNT(*) FROM sys.databases WHERE name = @name", new { name = name });

            if (databaseExists == 0)
            {
                connection.Execute($"CREATE DATABASE {name}");
            }
        }
    }
}
