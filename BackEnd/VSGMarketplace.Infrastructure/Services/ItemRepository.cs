using System.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;
using VSGMarketplace.Application.Models.ItemModels.DTOs;
using VSGMarketplace.Application.Models.ItemModels.Interfaces;

namespace VSGMarketplace.Infrastructure.Services
{
    public class ItemRepository : IItemRepository
    {
        private readonly IConfiguration _config;

        public ItemRepository(IConfiguration config)
        {
            _config = config;
        }

        public async Task<IEnumerable<ItemDTO>> GetAll()
        {
            await using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            IEnumerable<ItemDTO> items = await connection.QueryAsync<ItemDTO>("SELECT i.*, c.CategoryType, l.City, p.Image FROM Items i LEFT JOIN Categories c ON i.Id = c.ItemId LEFT JOIN Locations l ON i.Id = l.ItemId LEFT JOIN Pictures p ON i.Id = p.ItemId");

            return items;
        }

        public async Task<ItemDTO> GetById(int id)
        {
            await using var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            var item = await connection.QueryFirstAsync<ItemDTO>("SELECT i.*, c.CategoryType, l.City, p.Image FROM Items i LEFT JOIN Categories c ON i.Id = c.ItemId LEFT JOIN Locations l ON i.Id = l.ItemId LEFT JOIN Pictures p ON i.Id = p.ItemId WHERE id = @Id",
                new {Id = id});

            return item;
        }

        public async Task<ItemDTO> Create(ItemDTO item)
        {
            throw new NotImplementedException();
        }

        public async Task Update(ItemDTO item)
        {
            throw new NotImplementedException();
        }

        public async Task Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
