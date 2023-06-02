namespace MarketplaceApplication.Models.LendModels.DTOs
{
    public class LendedItemsPerUserModel
    {
        public int Id { get; set; }

        public string StartDate { get; set; }

        public string EndDate { get; set; }

        public int Quantity { get; set; }

        public int ProductId { get; set; }

        public string ProductCode { get; set; }

        public string ProductFullName { get; set; }
    }
}
