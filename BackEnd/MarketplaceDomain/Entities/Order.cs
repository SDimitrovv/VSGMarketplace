using System.ComponentModel.DataAnnotations.Schema;

namespace MarketplaceDomain.Entities
{
    [Table("Orders")]
    public class Order : BaseEntity
    {
        public int Quantity { get; set; }

        public string Date { get; set; } 

        public string Status { get; set; } 

        public int ProductId { get; set; }

        public string Email { get; set; }
    }
}
