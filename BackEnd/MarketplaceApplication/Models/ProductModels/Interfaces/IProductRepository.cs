using MarketplaceApplication.Models.GenericRepository;
using MarketplaceApplication.Models.ProductModels.DTOs;
using MarketplaceDomain.Entities;

namespace MarketplaceApplication.Models.ProductModels.Interfaces;

public interface IProductRepository : IGenericRepository<Product>
{
    Task<ProductGetDetailsModel> GetDetails(int id);
    Task<IEnumerable<ProductGetInventoryModel>> GetInventory();
    Task<IEnumerable<ProductGetMarketplaceModel>> GetMarketplace();
    Task ReduceQuantity(int productId, int quantityReduce);
    Task ReturnQuantity(int productId, int quantityReturn);

}