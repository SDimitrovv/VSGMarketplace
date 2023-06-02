using MarketplaceApplication.Models.LendModels.DTOs;
using MarketplaceApplication.Models.LendModels.Interfaces;

namespace MarketplaceApplication.Services
{
    public class LendService : ILendService
    {
        public Task<IEnumerable<AllLendedItemsModel>> GetAllLendedItems()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<MyLendedItemsModel>> GetMyLendedItems()
        {
            throw new NotImplementedException();
        }

        public Task<AddedLendModel> CreateLend(AddLendModel model)
        {
            throw new NotImplementedException();
        }

        public Task ReturnItem(int id)
        {
            throw new NotImplementedException();
        }
    }
}
