using System.ComponentModel.DataAnnotations.Schema;

namespace VSGMarketplace.Domain.Entities
{
    [Table("Items")]
    public class Item : BaseEntity
    {
        public string FullName { get; set; }
        
        public decimal Price { get; set; }

        public int Quantity { get; set; }   

        public int QuantityForSale { get; set; }

        public string Description { get; set; }
    }
}
