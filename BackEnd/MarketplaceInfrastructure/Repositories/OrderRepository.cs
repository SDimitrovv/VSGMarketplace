using MarketplaceApplication.Models.OrderModels.Interfaces;
using MarketplaceDomain.Entities;

namespace MarketplaceInfrastructure.Repositories
{
    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {

    }
}
