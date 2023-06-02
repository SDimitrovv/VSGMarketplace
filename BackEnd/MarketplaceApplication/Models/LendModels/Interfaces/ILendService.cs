using MarketplaceApplication.Models.LendModels.DTOs;

namespace MarketplaceApplication.Models.LendModels.Interfaces;

public interface ILendService
{
    Task<IEnumerable<AllLendedItemsModel>> GetAllLendedItems();
    Task<IEnumerable<MyLendedItemsModel>> GetMyLendedItems();
    Task<AddedLendModel> CreateLend(AddLendModel model);
    Task ReturnItem(int id);
}