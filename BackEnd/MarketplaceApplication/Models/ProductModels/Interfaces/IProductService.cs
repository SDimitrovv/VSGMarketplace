using MarketplaceApplication.Models.ProductModels.DTOs;

namespace MarketplaceApplication.Models.ProductModels.Interfaces;

public interface IProductService
{
    Task<ProductGetDetailsModel> GetDetails(int id);
    Task<IEnumerable<ProductGetInventoryModel>> GetInventory();
    Task<IEnumerable<ProductGetMarketplaceModel>> GetMarketplace();
    Task<ProductAddedModel> Add(ProductAddModel addModel);
    Task Update(int productId, ProductEditModel editModel);
    Task Delete(int id);
}