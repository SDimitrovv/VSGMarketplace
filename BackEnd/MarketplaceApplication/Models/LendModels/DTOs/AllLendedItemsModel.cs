namespace MarketplaceApplication.Models.LendModels.DTOs
{
    public class AllLendedItemsModel
    {
        public string Email { get; set; }

        public IEnumerable<LendedItemsPerUserModel> LendedItems { get; set; }
    }
}
