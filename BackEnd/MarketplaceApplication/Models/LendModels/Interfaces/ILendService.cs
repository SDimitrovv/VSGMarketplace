using MarketplaceApplication.Models.LendModels.DTOs;

namespace MarketplaceApplication.Models.LendModels.Interfaces;

public interface ILendService
{
    Task<IEnumerable<AllLentItemsModel>> GetAllLentItems();
    Task<IEnumerable<MyLentItemsModel>> GetMyLentItems();
    Task<AddedLendModel> CreateLend(AddLendModel model);
    Task<string> ReturnItem(int id);
}