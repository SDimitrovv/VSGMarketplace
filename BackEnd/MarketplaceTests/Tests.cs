using AutoMapper;
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
        private readonly Mock<IOrderRepository> _orderRepositoryMock = new Mock<IOrderRepository>();
        private readonly Mock<IProductRepository> _productRepositoryMock = new Mock<IProductRepository>();
        private readonly Mock<IMapper> _mapperMock = new Mock<IMapper>();

        [Test]
        public async Task GetPendingOrders_ReturnsExpectedResult()
        {
            var expected = new List<PendingOrdersGetModel>
            {
                new PendingOrdersGetModel(),
                new PendingOrdersGetModel(),
                new PendingOrdersGetModel()
            };

            _orderRepositoryMock.Setup(x => x.GetPendingOrders())
                                .ReturnsAsync(expected);

            var service = new OrderService(_orderRepositoryMock.Object,
                                            _productRepositoryMock.Object,
                                            _mapperMock.Object);

            var result = await service.GetPendingOrders();

            Assert.AreEqual(expected, result);
        }

        [Test]
        public async Task GetMyOrders_ReturnsExpectedResult()
        {
            var expected = new List<MyOrdersGetModel>
            {
                new MyOrdersGetModel(),
                new MyOrdersGetModel(),
                new MyOrdersGetModel()
            };

            const string email = "test@example.com";

            _orderRepositoryMock.Setup(x => x.GetMyOrders(email))
                                .ReturnsAsync(expected);

            var service = new OrderService(_orderRepositoryMock.Object,
                                            _productRepositoryMock.Object,
                                            _mapperMock.Object);

            var result = await service.GetMyOrders(email);

            Assert.AreEqual(expected, result);
        }

        [Test]
        public async Task CreateOrder_ReturnsExpectedResult()
        {
            var addModel = new AddOrderModel();
            var order = new Order { ProductId = 1, Quantity = 2 };
            const int orderId = 3;
            var expected = new AddedOrderModel();

            _mapperMock.Setup(x => x.Map<Order>(addModel))
                        .Returns(order);

            _orderRepositoryMock.Setup(x => x.Create(order))
                                .ReturnsAsync(orderId);

            _productRepositoryMock.Setup(x => x.ReduceQuantity(order.ProductId, order.Quantity))
                                    .Returns(Task.CompletedTask);

            _mapperMock.Setup(x => x.Map<AddedOrderModel>(order))
                        .Returns(expected);

            var service = new OrderService(_orderRepositoryMock.Object,
                                            _productRepositoryMock.Object,
                                            _mapperMock.Object);

            var result = await service.CreateOrder(addModel);

            Assert.AreEqual(expected, result);
        }

        [Test]
        public async Task UpdateComplete_ShouldUpdateOrderStatusToFinished()
        {
            const int orderId = 1;
            var order = new Order { Id = orderId, Status = Status.Pending.ToString() };
            _orderRepositoryMock.Setup(x => x.GetByID(orderId)).ReturnsAsync(order);
            _orderRepositoryMock.Setup(x => x.Update(order)).Returns(Task.CompletedTask);

            var service = new OrderService(_orderRepositoryMock.Object, _productRepositoryMock.Object, _mapperMock.Object);

            await service.UpdateComplete(orderId);

            Assert.AreEqual(Status.Finished.ToString(), order.Status);
            _orderRepositoryMock.Verify(x => x.Update(order), Times.Once);
        }

        [Test]
        public async Task UpdateReject_ShouldUpdateOrderStatusToDeclinedAndReturnProductQuantity()
        {
            const int orderId = 1;
            const int productId = 2;
            const int quantity = 3;
            var order = new Order { Id = orderId, ProductId = productId, Quantity = quantity, Status = Status.Pending.ToString() };
            _orderRepositoryMock.Setup(x => x.GetByID(orderId)).ReturnsAsync(order);
            _orderRepositoryMock.Setup(x => x.Update(order)).Returns(Task.CompletedTask);
            _productRepositoryMock.Setup(x => x.ReturnQuantity(productId, quantity)).Returns(Task.CompletedTask);

            var service = new OrderService(_orderRepositoryMock.Object, _productRepositoryMock.Object, _mapperMock.Object);

            await service.UpdateReject(orderId);

            Assert.AreEqual(Status.Declined.ToString(), order.Status);
            _orderRepositoryMock.Verify(x => x.Update(order), Times.Once);
            _productRepositoryMock.Verify(x => x.ReturnQuantity(productId, quantity), Times.Once);
        }
    }
}