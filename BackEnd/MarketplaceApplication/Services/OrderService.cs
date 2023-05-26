using AutoMapper;
using MarketplaceApplication.Models.OrderModels.DTOs;
using MarketplaceApplication.Models.OrderModels.Interfaces;
using MarketplaceApplication.Models.ProductModels.Interfaces;
using MarketplaceDomain.Entities;
using MarketplaceDomain.Enums;
using Microsoft.AspNetCore.Http;

namespace MarketplaceApplication.Services
{
    public class OrderService : IOrderService 
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public OrderService(IOrderRepository orderRepository, IProductRepository productRepository,IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
                _orderRepository = orderRepository;
                _productRepository = productRepository;
                _mapper = mapper;
                _httpContextAccessor = httpContextAccessor;
        }

        public async Task<IEnumerable<PendingOrdersGetModel>> GetPendingOrders()
        {
            return await _orderRepository.GetPendingOrders();
        }

        public async Task<IEnumerable<MyOrdersGetModel>> GetMyOrders()
        {
            var userEmail = _httpContextAccessor.HttpContext.User.FindFirst("preferred_username")?.Value;

            return await _orderRepository.GetMyOrders(userEmail);
        }

        public async Task<AddedOrderModel> CreateOrder(AddOrderModel model)
        {
            await ExceptionService.ThrowExceptionWhenIdNotFound(model.ProductId, _productRepository);

            var product = await _productRepository.GetById(model.ProductId);
            ExceptionService.ThrowExceptionWhenNotEnoughQuantityForSale(product.QuantityForSale, model.Quantity);

            var order = _mapper.Map<Order>(model);
            order.ProductFullName = product.FullName;
            order.ProductPrice = product.Price;
            order.ProductCode = product.Code;
            order.Email = _httpContextAccessor.HttpContext.User.FindFirst("preferred_username")?.Value;

            var orderId = await _orderRepository.Create(order);
            order.Id = orderId;

            await _productRepository.ReduceQuantity(order.ProductId, order.Quantity);

            var newOrder = _mapper.Map<AddedOrderModel>(order);

            return newOrder;
        }

        public async Task UpdateComplete(int id)
        {
            await ExceptionService.ThrowExceptionWhenIdNotFound(id, _orderRepository);

            var newOrder = await _orderRepository.GetById(id);

            ExceptionService.ThrowExceptionWhenOrderIsNotPending(newOrder.Status);

            newOrder.Status = Status.Finished.ToString();

            await _orderRepository.Update(newOrder);
        }

        public async Task UpdateReject(int id)
        {
            await ExceptionService.ThrowExceptionWhenIdNotFound(id, _orderRepository);

            var newOrder = await _orderRepository.GetById(id);
            var userEmail = _httpContextAccessor.HttpContext.User.FindFirst("preferred_username")?.Value;

            ExceptionService.ThrowExceptionWhenEmailNotTheSame(newOrder.Email, userEmail);
            ExceptionService.ThrowExceptionWhenOrderIsNotPending(newOrder.Status);

            newOrder.Status = Status.Declined.ToString();

            await _orderRepository.Update(newOrder);

            await _productRepository.ReturnQuantity(newOrder.ProductId, newOrder.Quantity);
        }
    }
}
