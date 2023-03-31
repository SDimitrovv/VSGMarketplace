using System.ComponentModel.DataAnnotations.Schema;

namespace VSGMarketplace.Domain.Entities
{
    [Table("Locations")]
    public class Location : BaseEntity
    {
        public string City { get; set; }

        public int ItemId { get; set; }
    }
}
