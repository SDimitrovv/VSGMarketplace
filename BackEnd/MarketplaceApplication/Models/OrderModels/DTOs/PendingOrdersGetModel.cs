using MarketplaceDomain.Enums;

namespace MarketplaceApplication.Models.OrderModels.DTOs
{
    public class PendingOrdersGetModel
    {
        public int Id { get; set; }

        public int Quantity { get; set; }

        public string FormattedDate => Date.ToString("yyyy-MM-dd HH:mm:ss");

        public DateTime Date { get; set; }

        public string Status { get; set; }

        public string Email { get; set; }

        public string Code { get; set; }

        public decimal Price { get; set; }
    }
}
