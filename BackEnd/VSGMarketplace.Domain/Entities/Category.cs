using System.ComponentModel.DataAnnotations.Schema;

namespace VSGMarketplace.Domain.Entities
{
    [Table("Categories")]
    public class Category : BaseEntity
    {
        public string Type { get; set; }

        public int ItemId { get; set; }
    }
}
