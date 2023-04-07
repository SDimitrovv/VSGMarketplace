using MarketplaceApplication.Models.ProductModels.Interfaces;
using MarketplaceDomain.Entities;

namespace MarketplaceInfrastructure.Repositories
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
     
    }
}
