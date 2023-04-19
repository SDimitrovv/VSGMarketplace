namespace MarketplaceApplication.Models.OrderModels.DTOs
{
    public class EditOrderModel
    {
        public int Quantity { get; set; }

        public string FormattedDate { get; set; }

        public DateTime Date { get; set; }

        public string Status { get; set; }

        public int ProductId { get; set; }

        public string Email { get; set; }
    }
}
