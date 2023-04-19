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
                Date = DateTime.Now,
                Status = Status.Pending.ToString(),
                ProductId = model.ProductId,
                Email = model.Email
            };

            var orderId = await _orderRepository.Create(order);
            order.Id = orderId;

            await _productRepository.ReduceQuantity(order.ProductId, order.Quantity);

            return order;
        }
    }
}
