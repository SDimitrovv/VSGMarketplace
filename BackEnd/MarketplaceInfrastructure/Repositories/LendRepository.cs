using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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

        public async Task<IEnumerable<MyLendedItemsModel>> GetMyLendedItems(string email)
        {
            var query = @"SELECT l.*
                        FROM Lends AS l
                        WHERE l.Email = @email";

            var lends = await Connection.QueryAsync<MyLendedItemsModel>(query, new {email}, Transaction);

            return lends;
        }
    }
}
