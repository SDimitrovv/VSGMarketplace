using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MarketplaceDomain.Enums;

namespace MarketplaceDomain.Entities
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
