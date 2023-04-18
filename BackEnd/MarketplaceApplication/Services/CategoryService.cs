using MarketplaceApplication.Models.CategoryModels.Interfaces;
using MarketplaceDomain.Entities;

namespace MarketplaceApplication.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _repository;

        public CategoryService(ICategoryRepository repository)
        {
            _repository = repository;
        }
        public async Task<IEnumerable<Category>> GetCategories()
        {
            var categories = await _repository.GetAll();

            return categories;
        }
    }
}
