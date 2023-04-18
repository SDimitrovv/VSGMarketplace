using MarketplaceApplication.Models.CategoryModels.Interfaces;
using MarketplaceApplication.Models.GenericRepository;
using MarketplaceDomain.Entities;

namespace MarketplaceInfrastructure.Repositories
{
    public class CategoryRepository : GenericRepository<Category>,ICategoryRepository
    {
        public CategoryRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }
    }
}
