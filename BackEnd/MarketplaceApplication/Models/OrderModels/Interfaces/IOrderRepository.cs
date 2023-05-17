using MarketplaceApplication.Models.GenericRepository;
using MarketplaceApplication.Models.OrderModels.DTOs;
using MarketplaceDomain.Entities;

namespace MarketplaceApplication.Models.OrderModels.Interfaces;

public interface IOrderRepository : IGenericRepository<Order>
{
    Task<IEnumerable<PendingOrdersGetModel>> GetPendingOrders();
    Task<IEnumerable<MyOrdersGetModel>> GetMyOrders(string email);
    Task<GetOrderModel> GetOrderByProductId(int productId);
}