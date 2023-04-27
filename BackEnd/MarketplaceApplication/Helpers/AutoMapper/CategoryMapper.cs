using AutoMapper;
using MarketplaceApplication.Models.CategoryModels.DTOs;
using MarketplaceDomain.Entities;

namespace MarketplaceApplication.Helpers.AutoMapper
{
    public class CategoryMapper : Profile
    {
        public CategoryMapper()
        {
            CreateMap<Category, GetAllCategoryModel>();
        }
    }
}
