using MarketplaceApplication.Models.ProductModels.DTOs;
using MarketplaceDomain.Entities;

namespace MarketplaceApplication.Models.ProductModels.Interfaces;

public interface IProductService
{
    Task<ProductGetDetailsModel> GetDetails(int id);
    Task<IEnumerable<ProductGetInventoryModel>> GetInventory();
    Task<IEnumerable<ProductGetMarketplaceModel>> GetMarketplace();
    Task<ProductAddedModel> Add(ProductAddModel model);
    Task<Product> Update(int productId, ProductEditModel newProduct);
    Task Delete(int id);
}