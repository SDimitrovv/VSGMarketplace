using MarketplaceApplication.Models.OrderModels.DTOs;
using MarketplaceApplication.Models.OrderModels.Interfaces;
using MarketplaceApplication.Models.ProductModels.Interfaces;
using MarketplaceDomain.Entities;
using MarketplaceDomain.Enums;

namespace MarketplaceApplication.Services
{
    public class OrderService : IOrderService 
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IProductRepository _productRepository;

        public OrderService(IOrderRepository orderRepository, IProductRepository productRepository)
        {
                _orderRepository = orderRepository;
                _productRepository = productRepository;
        }

        public async Task<IEnumerable<PendingOrdersGetModel>> GetPendingOrders()
        {
            return await _orderRepository.GetPendingOrders();
        }

        public async Task<IEnumerable<MyOrdersGetModel>> GetMyOrders(string email)
        {
            return await _orderRepository.GetMyOrders(email);
        }

        public async Task<Order> CreateOrder(AddOrderModel model)
        {
            var order = new Order
            {
                Quantity = model.Quantity,
                Date = DateTime.Now.ToString("yyyy-MM-dd HH:mm"),
                Status = Status.Pending.ToString(),
                ProductId = model.ProductId,
                Email = model.Email
            };

            var orderId = await _orderRepository.Create(order);
            order.Id = orderId;

            await _productRepository.ReduceQuantity(order.ProductId, order.Quantity);

            return order;
        }

        public async Task UpdateComplete(int id)
        {
            var newOrder = await _orderRepository.GetByID(id);
            newOrder.Status = Status.Finished.ToString();

            await _orderRepository.Update(newOrder);
        }

        public async Task UpdateReject(int id)
        {
            var newOrder = await _orderRepository.GetByID(id);
            newOrder.Status = Status.Declined.ToString();

            await _orderRepository.Update(newOrder);

            await _productRepository.ReturnQuantity(newOrder.ProductId, newOrder.Quantity);
        }
    }
}
