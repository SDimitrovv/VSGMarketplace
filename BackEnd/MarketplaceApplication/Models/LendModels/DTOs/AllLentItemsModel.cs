namespace MarketplaceApplication.Models.LendModels.DTOs
{
    public class AllLentItemsModel
    {
        public string Email { get; set; }

        public IEnumerable<LentItemsPerUserModel> LentItems { get; set; }
    }
}
