using MarketplaceApplication.Models.OrderModels.DTOs;
using MarketplaceDomain.Entities;

namespace MarketplaceApplication.Models.OrderModels.Interfaces;

public interface IOrderService
{
    Task<IEnumerable<PendingOrdersGetModel>> GetPendingOrders();
    Task<IEnumerable<MyOrdersGetModel>> GetMyOrders(string email);
    Task<Order> CreateOrder(int productId, AddOrderModel model);
}