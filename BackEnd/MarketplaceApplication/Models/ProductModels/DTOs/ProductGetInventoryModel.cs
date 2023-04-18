namespace MarketplaceApplication.Models.ProductModels.DTOs
{
    public class ProductGetInventoryModel
    {
        public int Id { get; set; }

        public string Code { get; set; }

        public string FullName { get; set; }

        public int Quantity { get; set; }

        public int QuantityForSale { get; set; }

        public string Type { get; set; }
    }
}
