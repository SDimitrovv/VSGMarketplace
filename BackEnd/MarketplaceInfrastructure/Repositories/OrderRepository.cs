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
            var query = @"SELECT o.Id, o.Quantity, o.Date, o.Status, o.Email, p.Code, (o.Quantity * p.Price) AS Price
                        FROM Orders AS o
                        LEFT JOIN Products AS p
                        ON o.ProductId = p.Id
                        WHERE o.Status = 'Pending'";

            var orders = await Connection.QueryAsync<PendingOrdersGetModel>(query, null, Transaction);

            return orders;
        }

        public async Task<IEnumerable<MyOrdersGetModel>> GetMyOrders(string email)
        {
            var query = @"SELECT o.Id, o.Quantity, o.Date, o.Status, p.FullName, (o.Quantity * p.Price) AS Price
                        FROM Orders AS o
                        LEFT JOIN Products AS p
                        ON o.ProductId = p.Id
                        WHERE o.Email = @email";

            var orders = await Connection.QueryAsync<MyOrdersGetModel>(query, new {email}, Transaction);

            return orders;
        }
    }
}
