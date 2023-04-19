namespace MarketplaceApplication.Models.OrderModels.DTOs
{
    public class MyOrdersGetModel
    {
        public int Quantity { get; set; }

        public string FormattedDate => Date.ToString("yyyy-MM-dd HH:mm:ss");

        public DateTime Date { get; set; }

        public string Status { get; set; }

        public string FullName { get; set; }

        public decimal Price { get; set; }
    }
}
