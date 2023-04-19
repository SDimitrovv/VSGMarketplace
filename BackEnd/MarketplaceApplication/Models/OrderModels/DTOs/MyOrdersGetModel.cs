using MarketplaceDomain.Enums;

namespace MarketplaceApplication.Models.OrderModels.DTOs
{
    public class MyOrdersGetModel
    {
        public int Quantity { get; set; }

        public DateTime Date { get; set; }

        public string Status { get; set; }

        public string FullName { get; set; }

        public decimal Price { get; set; }
    }
}
