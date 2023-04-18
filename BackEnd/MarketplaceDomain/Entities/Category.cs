using System.ComponentModel.DataAnnotations.Schema;

namespace MarketplaceDomain.Entities
{
    [Table("Categories")]
    public class Category : BaseEntity
    {
        public string Type { get; set; }
    }
}
