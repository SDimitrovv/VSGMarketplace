using System.ComponentModel.DataAnnotations.Schema;

namespace MarketplaceDomain.Entities
{
    [Table("Locations")]
    public class Location : BaseEntity
    {
        public string City { get; set; }
    }
}
