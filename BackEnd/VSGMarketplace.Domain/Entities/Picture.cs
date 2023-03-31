using System.ComponentModel.DataAnnotations.Schema;

namespace VSGMarketplace.Domain.Entities
{
    [Table("Pictures")]
    public class Picture : BaseEntity
    {
        public byte[] Image { get; set; }

        public int ItemId { get; set; }
    }
}
