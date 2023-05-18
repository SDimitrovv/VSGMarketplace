using AutoMapper;
using MarketplaceApplication.Models.ProductModels.DTOs;
using MarketplaceDomain.Entities;

namespace MarketplaceApplication.Helpers.AutoMapper
{
    public class ProductMapper : Profile
    {
        public ProductMapper()
        {
            CreateMap<ProductAddModel, Product>();

            CreateMap<Product, ProductAddedModel>();

            CreateMap<ProductEditModel, Product>();
        }
    }
}
