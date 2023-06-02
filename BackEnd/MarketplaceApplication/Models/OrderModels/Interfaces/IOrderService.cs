using MarketplaceApplication.Models.OrderModels.DTOs;

namespace MarketplaceApplication.Models.OrderModels.Interfaces;

public interface IOrderService
{
    Task<IEnumerable<PendingOrdersGetModel>> GetPendingOrders();
    Task<IEnumerable<MyOrdersGetModel>> GetMyOrders();
    Task<AddedOrderModel> CreateOrder(AddOrderModel model);
    Task UpdateComplete(int id);
    Task UpdateReject(int id);
}