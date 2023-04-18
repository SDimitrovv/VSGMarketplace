namespace MarketplaceApplication.Models.ProductModels.DTOs
{
    public class ProductGetDetailsModel
    {
        public string FullName { get; set; }

        public decimal Price { get; set; }

        public int QuantityForSale { get; set; }

        public string Description { get; set; }

        public string Type { get; set; }

        public string ImageUrl { get; set; }
    }
}
