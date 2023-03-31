using System.ComponentModel.DataAnnotations.Schema;

namespace VSGMarketplace.Domain.Entities
{
    [Table("Orders")]
    public class Order : BaseEntity
    {
        public int Quantity { get; set; }

        public DateTime Date { get; set; }

        public string Status { get; set; }

        public int ItemId { get; set; }
    }
}
