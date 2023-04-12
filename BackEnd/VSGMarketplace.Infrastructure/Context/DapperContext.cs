using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using VSGMarketplace.Application.Helpers;

namespace VSGMarketplace.Infrastructure.Context
{
    public class DapperContext : IDapperContext
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;
        private IDbConnection _connection;

        public DapperContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("SqlConnection");
            _connection = new SqlConnection(_connectionString);
            _connection.Open();
        }


        public IDbConnection Connection => _connection;

        public void Dispose()
        {
            _connection.Close();
            _connection.Dispose();
        }

    }
}
