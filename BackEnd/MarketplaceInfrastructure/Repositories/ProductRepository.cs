using Dapper;
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

        public async Task<ProductGetDetailsModel> GetDetails(int id)
        {
            var query = @"SELECT p.Id, p.FullName, p.Price, p.QuantityForSale, p.Description, p.Category, pic.ImageUrl
                        FROM Products AS p
                        LEFT JOIN Pictures AS pic ON pic.ProductId = p.Id
                        WHERE p.Id = @id";

            var details = await Connection.QueryFirstOrDefaultAsync<ProductGetDetailsModel>(query, new { id });

            return details;
        }

        public async Task<IEnumerable<ProductGetInventoryModel>> GetInventory()
        {
            var query = @"SELECT Id, Code, FullName, Quantity, QuantityForSale, Category FROM Products";

            var products = await Connection.QueryAsync<ProductGetInventoryModel>(query);

            return products;
        }

        public async Task<IEnumerable<ProductGetMarketplaceModel>> GetMarketplace()
        {
            var query = @"SELECT p.Id, p.Price, p.QuantityForSale, p.Category, pic.ImageUrl
                        FROM Products AS p
                        LEFT JOIN Pictures AS pic ON pic.ProductId = p.Id
                        WHERE p.QuantityForSale > 0";

            var products = await Connection.QueryAsync<ProductGetMarketplaceModel>(query);

            return products;
        }
    }
}
