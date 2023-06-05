using MarketplaceApplication.Models.GenericRepository;
using MarketplaceApplication.Models.LendModels.DTOs;
using MarketplaceDomain.Entities;

namespace MarketplaceApplication.Models.LendModels.Interfaces;

public interface ILendRepository : IGenericRepository<Lend>
{
    Task<IEnumerable<MyLendedItemsModel>> GetMyLentItems(string email);
}