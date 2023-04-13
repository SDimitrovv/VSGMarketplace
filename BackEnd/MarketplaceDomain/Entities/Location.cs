using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MarketplaceDomain.Entities
{
    [Table("Locations")]
    public class Location : BaseEntity
    {
        public string City { get; set; }

    }
}
