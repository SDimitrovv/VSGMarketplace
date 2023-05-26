using Dapper;
using MarketplaceApplication.Models.GenericRepository;
using MarketplaceApplication.Models.OrderModels.DTOs;
using MarketplaceApplication.Models.OrderModels.Interfaces;
using MarketplaceDomain.Entities;

namespace MarketplaceInfrastructure.Repositories
{
    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {
        public OrderRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }

        public async Task<IEnumerable<PendingOrdersGetModel>> GetPendingOrders()
        {
            var query = @"SELECT o.Id, o.Quantity, o.Date, o.Status, o.Email, o.ProductCode, (o.Quantity * o.ProductPrice) AS Price
                        FROM Orders AS o
                        WHERE o.Status = 'Pending'";

            var orders = await Connection.QueryAsync<PendingOrdersGetModel>(query, null, Transaction);

            return orders;
        }

        public async Task<IEnumerable<MyOrdersGetModel>> GetMyOrders(string email)
        {
            var query = @"SELECT o.Id, o.Quantity, o.Date, o.Status, o.ProductFullName, (o.Quantity * o.ProductPrice) AS Price
                        FROM Orders AS o
                        WHERE o.Email = @email";

            var orders = await Connection.QueryAsync<MyOrdersGetModel>(query, new {email}, Transaction);

            return orders;
        }

        public async Task<GetOrderModel> GetOrderByProductId(int productId)
        {
            var query = @"SELECT *
                        FROM Orders
                        WHERE ProductId = @productId
                        AND Status = 'Pending'";

            var order = await Connection.QueryFirstOrDefaultAsync<GetOrderModel>(query, new { productId }, Transaction);

            return order;
        }
    }
}
