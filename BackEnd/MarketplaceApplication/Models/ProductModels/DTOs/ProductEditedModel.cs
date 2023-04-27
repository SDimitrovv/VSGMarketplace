﻿namespace MarketplaceApplication.Models.ProductModels.DTOs
{
    public class ProductEditedModel
    {
        public int Id { get; set; }

        public string Code { get; set; }

        public string FullName { get; set; }

        public decimal Price { get; set; }

        public int Quantity { get; set; }

        public int QuantityForSale { get; set; }

        public string Description { get; set; }

        public int CategoryId { get; set; }
    }
}
