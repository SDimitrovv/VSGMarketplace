namespace MarketplaceApplication.Models.OrderModels.DTOs
{
    public class PendingOrdersGetModel
    {
        public int Id { get; set; }

        public int Quantity { get; set; }

        public string Date { get; set; }

        public string Status { get; set; }

        public string Email { get; set; }

        public string ProductCode { get; set; }

        public decimal Price { get; set; }
    }
}
