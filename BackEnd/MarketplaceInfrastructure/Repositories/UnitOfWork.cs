using MarketplaceApplication.Models.GenericRepository;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace MarketplaceInfrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IConfiguration _config;
        private readonly string _connectionString;
        private IDbConnection _connection;

        public UnitOfWork(IConfiguration config)
        {
                _config = config;
                _connectionString = _config.GetConnectionString("DefaultConnection");
                _connection = new SqlConnection(_connectionString);
                _connection.Open();
        }

        public IDbConnection Connection => _connection;

        public void Dispose()
        {
            if (_connection != null)
            {
                _connection.Close();
                _connection.Dispose();
            }
        }
    }
}
