namespace VSGMarketplace.Application.Models.ItemModels.DTOs;

public class GetItemDto
{
    public int Id { get; set; }
    public string FullName { get; set; }

    public decimal Price { get; set; }

    public int Quantity { get; set; }

    public int QuantityForSale { get; set; }

    public string Description { get; set; }

    public string Type { get; set; }

    public string City { get; set; }

    public string Image { get; set; }
}