using System.ComponentModel.DataAnnotations.Schema;

namespace MarketplaceDomain.Entities
{
    [Table("Pictures")]

    public class Picture : BaseEntity
    { 
        public string ImageUrl { get; set; }

        public string ImagePublicId { get; set; }

        public int ProductId { get; set; }
    }
}
