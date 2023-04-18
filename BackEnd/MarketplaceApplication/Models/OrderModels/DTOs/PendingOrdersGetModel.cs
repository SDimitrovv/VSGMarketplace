using MarketplaceDomain.Enums;

namespace MarketplaceApplication.Models.OrderModels.DTOs
{
    public class PendingOrdersGetModel
    {
        public int Quantity { get; set; }

        public DateTime Date { get; set; }

        public Status Status { get; set; }

        public string Email { get; set; }

        public string Code { get; set; }

        public decimal Price { get; set; }
    }
}
