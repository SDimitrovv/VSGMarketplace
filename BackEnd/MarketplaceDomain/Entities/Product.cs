using MarketplaceDomain.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace MarketplaceDomain.Entities
{
    [Table("Products")]

    public class Product : BaseEntity
    {
        public string Code { get; set; }

        public string FullName { get; set; }

        public decimal Price { get; set; }

        public int Quantity { get; set; }

        public int QuantityForSale { get; set; }

        public string Description { get; set; }

        public Location Location { get; set; }

        public Category Category { get; set; }
    }
}
