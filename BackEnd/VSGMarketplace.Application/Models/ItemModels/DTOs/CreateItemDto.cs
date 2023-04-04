namespace VSGMarketplace.Application.Models.ItemModels.DTOs
{
    public class CreateItemDto
    {
        public string FullName { get; set; }

        public decimal Price { get; set; }

        public int Quantity { get; set; }

        public int QuantityForSale { get; set; }

        public string Description { get; set; }

        public string CategoryType { get; set; }

        public string City { get; set; }

        public byte[] Image { get; set; }

        public int ItemId { get; set; }
    }
}
