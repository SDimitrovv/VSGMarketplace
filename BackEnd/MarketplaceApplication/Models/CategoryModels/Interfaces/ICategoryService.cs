using MarketplaceDomain.Entities;

namespace MarketplaceApplication.Models.CategoryModels.Interfaces;

public interface ICategoryService
{
    public Task<IEnumerable<Category>> GetCategories();
}