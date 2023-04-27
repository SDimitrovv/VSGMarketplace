using MarketplaceApplication.Models.CategoryModels.DTOs;

namespace MarketplaceApplication.Models.CategoryModels.Interfaces;

public interface ICategoryService
{
    public Task<IEnumerable<GetAllCategoryModel>> GetCategories();
}