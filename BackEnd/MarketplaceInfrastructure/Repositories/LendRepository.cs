using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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

        public Task<IEnumerable<AllLendedItemsModel>> GetAllLendedItems()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<MyLendedItemsModel>> GetMyLendedItems(string email)
        {
            throw new NotImplementedException();
        }
    }
}
