using MarketplaceApplication.Models.GenericRepository;
using MarketplaceApplication.Models.LendModels.DTOs;
using MarketplaceDomain.Entities;

namespace MarketplaceApplication.Models.LendModels.Interfaces;

public interface ILendRepository : IGenericRepository<Lend>
{
    Task<IEnumerable<AllLendedItemsModel>> GetAllLendedItems();
    Task<IEnumerable<MyLendedItemsModel>> GetMyLendedItems(string email);
}