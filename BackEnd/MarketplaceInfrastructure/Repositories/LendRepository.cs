using Dapper;
using MarketplaceApplication.Models.GenericRepository;
using MarketplaceApplication.Models.LendModels.DTOs;
using MarketplaceApplication.Models.LendModels.Interfaces;
using MarketplaceDomain.Entities;

namespace MarketplaceInfrastructure.Repositories
{
    public class LendRepository : GenericRepository<Lend>, ILendRepository
    {
        public LendRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }

        public async Task<IEnumerable<MyLentItemsModel>> GetMyLentItems(string email)
        {
            var query = @"SELECT l.*
                        FROM Lends AS l
                        WHERE l.Email = @email";

            var lends = await Connection.QueryAsync<MyLentItemsModel>(query, new {email}, Transaction);

            return lends;
        }
    }
}
