namespace MarketplaceApplication.Models.OrderModels.DTOs
{
    public class AddedOrderModel
    {
        public int Id { get; set; }

        public int Quantity { get; set; }

        public string Date { get; set; }

        public string Status { get; set; }

        public int ProductId { get; set; }

        public string Email { get; set; }
    }
}
