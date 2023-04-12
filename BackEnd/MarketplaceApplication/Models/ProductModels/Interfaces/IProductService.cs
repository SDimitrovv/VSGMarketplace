using MarketplaceApplication.Models.ProductModels.DTOs;

namespace MarketplaceApplication.Models.ProductModels.Interfaces;

public interface IProductService
{
    Task<ProductGetDetailsModel> GetDetails(int id);

    Task<IEnumerable<ProductGetInventoryModel>> GetInventory();

    Task<IEnumerable<ProductGetMarketplaceModel>> GetMarketplace();

}