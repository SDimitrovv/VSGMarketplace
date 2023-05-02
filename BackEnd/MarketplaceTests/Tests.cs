using AutoMapper;
using MarketplaceApplication.Helpers.AutoMapper;
using MarketplaceApplication.Models.ExceptionModels;
using MarketplaceApplication.Models.OrderModels.DTOs;
using MarketplaceApplication.Models.OrderModels.Interfaces;
using MarketplaceApplication.Models.ProductModels.Interfaces;
using MarketplaceApplication.Services;
using MarketplaceDomain.Entities;
using MarketplaceDomain.Enums;
using Moq;
using NUnit.Framework;

namespace MarketplaceTests
{
    [TestFixture]
    public class Tests
    {
        private Mock<IOrderRepository> _orderRepository;
        private Mock<IProductRepository> _productRepository;
        private IMapper _mapper;
        private IOrderService _orderService;

        [SetUp]
        public void Setup()
        {
            _orderRepository = new Mock<IOrderRepository>();
            _productRepository = new Mock<IProductRepository>();
            _mapper = new Mapper(new MapperConfiguration(c =>
            {
                c.AddProfile<OrderMapper>();
            }));
            _orderService = new OrderService(_orderRepository.Object, _productRepository.Object, _mapper);
        }

        [Test]
        public async Task UpdateComplete_WhenOrderIsPending_ShouldUpdateStatusToFinished()
        {
            var orderId = 1;
            var order = new Order { Id = orderId, Status = Status.Pending.ToString() };
            _orderRepository.Setup(r => r.GetByID(orderId)).ReturnsAsync(order);

            await _orderService.UpdateComplete(orderId);

            _orderRepository.Verify(r => r.Update(It.Is<Order>(o => o.Id == orderId && o.Status == Status.Finished.ToString())), Times.Once);
        }

        [Test]
        public async Task UpdateReject_WhenOrderIsPending_ShouldUpdateOrderStatusToDeclined_AndReturnProductQuantity()
        {
            var orderId = 1;
            var productId = 2;
            var orderQuantity = 3;
            var order = new Order { Id = orderId, Status = Status.Pending.ToString(), ProductId = productId, Quantity = orderQuantity };
            _orderRepository.Setup(r => r.GetByID(orderId)).ReturnsAsync(order);

            await _orderService.UpdateReject(orderId);

            _orderRepository.Verify(r => r.Update(It.Is<Order>(o => o.Id == orderId && o.Status == Status.Declined.ToString())), Times.Once);
            _productRepository.Verify(r => r.ReturnQuantity(productId, orderQuantity), Times.Once);
        }

        [Test]
        public async Task CreateOrder_WhenEnoughQuantityForSale_ShouldCreateOrder_AndReduceProductQuantity()
        {
            var productId = 1;
            var productQuantityForSale = 5;
            var addOrderModel = new AddOrderModel { ProductId = productId, Quantity = 3 };
            var product = new Product { Id = productId, QuantityForSale = productQuantityForSale };
            _productRepository.Setup(r => r.GetByID(productId)).ReturnsAsync(product);

            var result = await _orderService.CreateOrder(addOrderModel);

            _orderRepository.Verify(r => r.Create(It.IsAny<Order>()), Times.Once);
            _productRepository.Verify(r => r.ReduceQuantity(productId, addOrderModel.Quantity), Times.Once);
            Assert.AreEqual(result.ProductId, productId);
            Assert.AreEqual(result.Quantity, addOrderModel.Quantity);
        }

        [Test]
        public void CreateOrder_WhenProductIdNotFound_ShouldThrowException()
        {
            var productId = 1;
            var addOrderModel = new AddOrderModel { ProductId = productId, Quantity = 3 };
            _productRepository.Setup(r => r.GetByID(productId))!.ReturnsAsync(null as Product);

            Assert.ThrowsAsync<HttpException>(async () => await _orderService.CreateOrder(addOrderModel));
        }

        [Test]
        public void CreateOrder_WhenNotEnoughQuantityForSale_ShouldThrowException()
        {
            var productId = 1;
            var productQuantityForSale = 5;
            var addOrderModel = new AddOrderModel { ProductId = productId, Quantity = 7 };
            var product = new Product { Id = productId, QuantityForSale = productQuantityForSale };
            _productRepository.Setup(r => r.GetByID(productId)).ReturnsAsync(product);

            Assert.ThrowsAsync<HttpException>(async () => await _orderService.CreateOrder(addOrderModel));
        }
    }
}