using AutoMapper;
using MarketplaceApplication.Models.ExceptionModels;
using MarketplaceApplication.Models.OrderModels.DTOs;
using MarketplaceApplication.Models.OrderModels.Interfaces;
using MarketplaceApplication.Models.ProductModels.Interfaces;
using MarketplaceApplication.Models.UserModels;
using MarketplaceDomain.Entities;
using MarketplaceDomain.Enums;
using System.Net;

namespace MarketplaceApplication.Services
{
    public class OrderService : IOrderService 
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;

        public OrderService(
            IOrderRepository orderRepository, 
            IProductRepository productRepository, 
            IMapper mapper, IUserService userService)
        {
                _orderRepository = orderRepository;
                _productRepository = productRepository;
                _mapper = mapper;
                _userService = userService;
        }

        public async Task<IEnumerable<PendingOrdersGetModel>> GetPendingOrders()
        {
            return await _orderRepository.GetPendingOrders();
        }

        public async Task<IEnumerable<MyOrdersGetModel>> GetMyOrders()
        {
            var userEmail = _userService.GetEmail("preferred_username");

            return await _orderRepository.GetMyOrders(userEmail);
        }

        public async Task<AddedOrderModel> CreateOrder(AddOrderModel model)
        {
            var product = await _productRepository.GetById(model.ProductId);
            if (product == null) 
                throw new HttpException("Product id not found!", HttpStatusCode.NotFound);

            if (model.Quantity > product.QuantityForSale) 
                throw new HttpException("Not enough quantity for sale!", HttpStatusCode.BadRequest);

            var order = _mapper.Map<Order>(model);
            order.ProductFullName = product.FullName;
            order.ProductPrice = product.Price;
            order.ProductCode = product.Code;
            order.Email = _userService.GetEmail("preferred_username");

            var orderId = await _orderRepository.Create(order);
            order.Id = orderId;

            product.Quantity -= model.Quantity;
            product.QuantityForSale -= model.Quantity;
            await _productRepository.Update(product);

            var newOrder = _mapper.Map<AddedOrderModel>(order);

            return newOrder;
        }

        public async Task UpdateComplete(int id)
        {
            var order = await _orderRepository.GetById(id);
            if (order == null) 
                throw new HttpException("Order id not found!", HttpStatusCode.NotFound);

            if (order.Status != "Pending") 
                throw new HttpException("Order is not pending!", HttpStatusCode.BadRequest);

            order.Status = Status.Finished.ToString();

            await _orderRepository.Update(order);
        }

        public async Task UpdateReject(int id)
        {
            var order = await _orderRepository.GetById(id);
            if (order == null) 
                throw new HttpException("Order id not found!", HttpStatusCode.NotFound);

            var userEmail = _userService.GetEmail("preferred_username");
            if (order.Email != userEmail) 
                throw new HttpException("Sorry!", HttpStatusCode.BadRequest);

            if (order.Status != "Pending") 
                throw new HttpException("Order is not pending!", HttpStatusCode.BadRequest);

            order.Status = Status.Declined.ToString();

            await _orderRepository.Update(order);

            var product = await _productRepository.GetById(order.ProductId);

            product.Quantity += order.Quantity;
            product.QuantityForSale += order.Quantity;
            await _productRepository.Update(product);
        }
    }
}
