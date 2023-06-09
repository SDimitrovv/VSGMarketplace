﻿using Dapper;
using MarketplaceApplication.Models.GenericRepository;
using MarketplaceApplication.Models.ProductModels.DTOs;
using MarketplaceApplication.Models.ProductModels.Interfaces;
using MarketplaceDomain.Entities;

namespace MarketplaceInfrastructure.Repositories
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        public ProductRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }

        public async Task<Product> GetByCode(string code, int locationId)
        {
            var query = @"SELECT p.*
                        FROM Products AS p                      
                        WHERE p.Code = @code
                        AND p.LocationId = @locationId";

            var product = await Connection.QueryFirstOrDefaultAsync<Product>(query, new { code, locationId }, Transaction);

            return product;
        }

        public async Task<ProductGetDetailsModel> GetDetails(int id)
        {
            var query = @"SELECT p.*, c.Type, l.City, pic.ImageUrl
                        FROM Products AS p
                        LEFT JOIN Pictures AS pic ON pic.ProductId = p.Id
                        LEFT JOIN Categories AS c ON c.Id = p.CategoryId
                        LEFT JOIN Locations AS l ON l.Id = p.LocationId
                        WHERE p.Id = @id";

            var details = await Connection.QueryFirstOrDefaultAsync<ProductGetDetailsModel>(query, new { id }, Transaction);

            return details;
        }

        public async Task<IEnumerable<ProductGetInventoryModel>> GetInventory()
        {
            var query = @"SELECT p.*, c.Type, l.City, pic.ImageUrl
                        FROM Products AS p
                        LEFT JOIN Categories AS c ON c.Id = p.CategoryId
                        LEFT JOIN Locations AS l ON l.Id = p.LocationId
                        LEFT JOIN Pictures AS pic ON pic.ProductId = p.Id";

            var products = await Connection.QueryAsync<ProductGetInventoryModel>(query, null, Transaction);

            return products;
        }

        public async Task<IEnumerable<ProductGetMarketplaceModel>> GetMarketplace()
        {
            var query = @"SELECT p.*, c.Type, l.City, pic.ImageUrl
                        FROM Products AS p
                        LEFT JOIN Pictures AS pic ON pic.ProductId = p.Id
                        LEFT JOIN Categories AS c ON c.Id = p.CategoryId
                        LEFT JOIN Locations AS l ON l.Id = p.LocationId
                        WHERE p.QuantityForSale > 0";

            var products = await Connection.QueryAsync<ProductGetMarketplaceModel>(query, null, Transaction);

            return products;
        }
    }
}
