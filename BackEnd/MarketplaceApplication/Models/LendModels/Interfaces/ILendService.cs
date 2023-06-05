using MarketplaceApplication.Models.LendModels.DTOs;

namespace MarketplaceApplication.Models.LendModels.Interfaces;

public interface ILendService
{
    Task<IEnumerable<AllLendedItemsModel>> GetAllLentItems();
    Task<IEnumerable<MyLendedItemsModel>> GetMyLentItems();
    Task<AddedLendModel> CreateLend(AddLendModel model);
    Task ReturnItem(int id);
}