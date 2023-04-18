namespace MarketplaceApplication.Models.ProductModels.DTOs
{
    public class ProductGetMarketplaceModel
    {
        public int Id { get; set; }

        public decimal Price { get; set; }

        public int QuantityForSale { get; set; }

        public string Type { get; set; }

        public string ImageUrl { get; set; }
    }
}
