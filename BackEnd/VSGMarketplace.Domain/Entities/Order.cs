using System.ComponentModel.DataAnnotations.Schema;
using VSGMarketplace.Domain.Enums;

namespace VSGMarketplace.Domain.Entities
{
    [Table("Orders")]
    public class Order : BaseEntity
    {
        public int Quantity { get; set; }

        public DateTime Date { get; set; } = DateTime.Now;

        public Status Status { get; set; } = Status.Pending;

        public int ItemId { get; set; }
    }
}
