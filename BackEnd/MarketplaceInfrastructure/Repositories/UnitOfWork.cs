using MarketplaceApplication.Models.GenericRepository;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace MarketplaceInfrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IConfiguration _config;
        private readonly string _connectionString;
        private IDbConnection _connection;
        private IDbTransaction _transaction;

        public UnitOfWork(IConfiguration config)
        {
                _config = config;
                _connectionString = _config.GetConnectionString("DefaultConnection");
                _connection = new SqlConnection(_connectionString);
                _connection.Open();

                _transaction = _connection.BeginTransaction();
        }

        public IDbConnection Connection => _connection;

        public IDbTransaction Transaction => _transaction;

        public void Dispose()
        {
            if (_connection != null)
            {
                _connection.Close();
                _connection.Dispose();
            }

            if (_transaction != null)
            {
                _transaction.Dispose();
            }
        }
    }
}
