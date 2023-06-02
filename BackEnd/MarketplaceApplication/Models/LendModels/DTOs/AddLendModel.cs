namespace MarketplaceApplication.Models.LendModels.DTOs
{
    public class AddLendModel
    {
        public string StartDate { get; set; }

        public string EndDate { get; set; }

        public int Quantity { get; set; }

        public int ProductId { get; set; }

        public string Email { get; set; }

        public string ProductCode { get; set; }

        public string ProductFullName { get; set; }
    }
}
