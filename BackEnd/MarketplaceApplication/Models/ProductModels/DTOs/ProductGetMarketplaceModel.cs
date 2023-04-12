using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MarketplaceApplication.Models.ProductModels.DTOs
{
    public class ProductGetMarketplaceModel
    {
        public int Id { get; set; }

        public decimal Price { get; set; }

        public int QuantityForSale { get; set; }

        public string Category { get; set; }

        public string ImageUrl { get; set; }
    }
}
