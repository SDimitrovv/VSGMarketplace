using MarketplaceDomain.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace MarketplaceDomain.Entities
{
    [Table("Orders")]
    public class Order : BaseEntity
    {
        public int Quantity { get; set; }

        public DateTime Date { get; set; } = DateTime.Now;

        public Status Status { get; set; } = Status.Pending;

        public int ProductId { get; set; }

        public string Email { get; set; }
    }
}
