using MarketplaceApplication.Models.ProductModels.DTOs;
using MarketplaceDomain.Entities;

namespace MarketplaceApplication.Models.ProductModels.Interfaces;

public interface IProductService
{
    Task<ProductGetDetailsModel> GetDetails(int id);
    Task<IEnumerable<ProductGetInventoryModel>> GetInventory();
    Task<IEnumerable<ProductGetMarketplaceModel>> GetMarketplace();
    Task<Product> Add(ProductAddModel model);
    Task<Product> GetForUpdate(int id);
    Task Update(int productId, ProductEditModel newProduct);
    Task Delete(int id);
}